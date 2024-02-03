---
title: "Toast UI Editor에서 각주 기능 구현하기"
createDate: "2023-09-12"
updateDate: "2023-12-06"
description: "Toast UI(TUI) Editor에서 각주(footnote) 기능 구현하기...."
tag: "개발"
---

### 들어가며

현재 사용하고 있는 Toast UI Editor(이하 'TE')에 각주 기능이 없는 것으로 보였다. 분명 GFM을 지원한다고 되어 있는데 실제로 `[^...]`와 `[^...]: ...` 방식으로 작성해도 각주로 변환되지 않았고, [공식 Docs](https://github.com/nhn/tui.editor/blob/master/docs/ko/README.md)에도 관련 언급이 없는 것 같다. 그래서 직접 만들어 보았다. 결론은 완벽하지는 않지만 어느 정도 원하는 결과에 도달할 수 있었다.

### 고려했던 대안

TE를 이용하여 구현하던 중 몇차례 벽에 부딪히는 과정에서, 다른 라이브러리를 사용하는 방법도 고려했었다. react-markdown, react-remark, easy-mdeditor 등등. 결국 다시 TE로 돌아오게 된 이유는 빌드했을 때 '글 수정 페이지'의 용량이, TE를 사용했을 때는 140kb 정도 였다면 react-\~\~\~의 경우 300kb를 넘었고, easy-meditor의 경우 600kb 정도 였다. TE로 각주를 제외하고는 이미 원하는 정도로 구현을 한 상태였고 사용하기에도 괜찮았기 때문에 굳이 새로운 라이브러리로 갈아타지 않았다.

### 원하는 결과

아래와 같은 형태의 html로 변환되면 된다.

```html
<!-- 본문 중 각주 표시 부분 -->
<sup id="fnref:각주이름">
  <a class="footnote-ref" href="#fn:각주이름">{각주번호}</a>
</sup>

<!-- 각주 부분 -->
<div class="footnote">
  <hr />
  <ol>
    <li id="fn:각주이름">
      <p>
        {각주 내용}
        <a class="footnote-backref" href="#fnref:각주이름">↩</a>
      </p>
    </li>
  </ol>
</div>
```

### 구현 과정

1. customHTMLRenderer
   공식 Docs를 읽어보니 customHTMLRenderer 옵션을 통해 AST 노드를 HTML 토큰으로 변환하는 과정을 커스터마이징할 수 있다고 돼있다. 다만 TE에서는 일단 AST&rarr;HTML 과정에 개입하는 방법만 마련해둔 듯 하다. 그런데 구현하다보니 마크다운 텍스트&rarr;AST 과정을 커스터마이징할 수 있으면 좋지 않을까 하는 생각도 들기는 했다. 아마 ProseMirror까지 공부해야 하지 않나 싶은데 그렇게까지 할 여력은 없었다.

1. 개요
   커밋 내용은 [여기](https://github.com/keenager/my-nextjs-site/commit/880eaf0b4204ac6f6d86680c8fa96c154beaea5f)
   몇가지 컨버팅 함수를 이용해 커스터마이징을 했다.

   - `link`  
     본문 중 각주 표시 부분(`[^...]`) 담당  
     위 텍스트(`[^...]`)가 앞뒤 텍스트 사이에 inline 형태로 들어가 있는데, TE가 각 노드를 탐색하는 과정에서 이 부분만 따로 구별하여 인식하지 못해서, 이 부분만 따로 윗첨자 및 링크로 커스터마이징할 수가 없는 듯 했다. 애초에 페이지 렌더링할 때 마크다운 텍스트 중 해당 부분, 즉 `[^...]`을 `[^...]()`로 수정하여 TE로 넘겨주기로 했다. 그러면 TE는 이를 link 타입의 노드로 인식하여 AST를 구성할 것이고, 그러면 노드 탐색 과정에서 이 부분만 따로 인식하여 커스터마이징하기가 수월해진다.

   - `paragraph`  
     실제 각주 부분(`[^...]: ...`) 담당
     주의할 부분은, paragraph 컨버팅 함수로 수정되는 부분은 `<p>`와 `</p>` 태그 자체이고, 그 자식 노드, 특히 내부 텍스트는 대상이 아니라는 사실이다. `origin()`의 결과를 출력해보면 단순히 `p`태그에 관한 HTML 토큰만 나온다.
     실제 각주의 내용을 표시할 때는 `[^...]:` 이 부분을 제외한 나머지만 표시되게 해야 하는데, 렌더링을 해보면 이 부분이 여전히 표시된다. TE가 paragraph 노드를 탐색하여 해당 컨버팅함수를 실행하여 적용한 뒤 그 자식 노드인 text 노드를 탐색하여 그 결과를 내놓기 때문이다. 따라서 컨텐츠 부분을 수정하려면 아래의 text 함수를 이용해야 한다.
   - `text`  
     공식 Docs를 보면, TE가 노드를 방문할 때 노드의 타입과 동일한 키 값을 가진 컨버팅 함수가 호출한다고 돼있다. 처음 읽을 때는 이 부분을 제대로 인식하지 못했는데, paragraph 내부 컨텐츠가 중복 표시되는 문제를 고민하다 위 문구가 눈에 띄었다.
     node를 출력해보니 paragraph 컨텐츠, 즉 텍스트의 노드 타입이 `text`였다. 따라서 customHTMLRenderer()에 text함수를 추가.

1. 스타일링
   css는 [github-markdown-css](https://github.com/sindresorhus/github-markdown-css)에서 footnote 부분만 가져옴.
   그 과정에선 유사클래스인 `target`, `before`에 관하여도 알아보고 내 경우에 맞게 수정하여 적용하였다.

### 실제 결과

1. 맨 처음 시도했던 방식
   처음 마크다운 텍스트를 작성할 때 아예 anchor 태그로 작성한 뒤 변형을 주려고 했으나, 기존 각주 문법에서 벗어나는 것이어서 채택하지 않았다.

   ```
   첫 번째 각주[^fn1]() 기타 내용
   [^fn1: first footnote]()
   ```

1. 기본

   ```
   두 번째 각주[^fn2] 기타 내용    // '()' 부분은 원문에는 없고 에디터에 넘겨주기 직전에 추가
   [^fn2]: second footnote
   ```

   두 번째 각주[^fn2] 기타 내용

   \[^fn2\]: second footnote

1. 각주 내용에 링크가 있는 경우

   ```
   세 번째 각주[^fn3] 기타 내용

   [^fn3]: third footnote, 각주 내 [첫 번째 링크](#first)
   각주 내 [두 번째 링크](#second)
   ```

   세 번째 각주[^fn3] 기타 내용

   \[^fn3\]: third footnote\, 각주 내 [첫 번째 링크](#first)
   각주 내 [두 번째 링크](#second)
