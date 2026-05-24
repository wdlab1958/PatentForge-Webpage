/**
 * PatentForge 소개 페이지 → 본 플랫폼 진입 동선.
 *
 * 운영(www.patentforge.co.kr / patentforge.co.kr / wdlab1958.github.io):
 *   → https://app.patentforge.co.kr  (가비아 클라우드)
 *
 * 로컬 개발 (localhost / 127.0.0.1 / *.local):
 *   → http://localhost:3700  (개발 중인 본 플랫폼)
 *
 * data-launch 속성이 있는 모든 요소(<a>/<button>) 의 href/click 을 자동 바인딩.
 * #hero-launch-note 가 있으면 어디로 가는지 한 줄 안내.
 *
 * 별도 빌드 없는 vanilla JS. 다른 모든 페이지 동작과 독립.
 */
(function () {
  "use strict";

  function pickPortalUrl() {
    var h = (location.hostname || "").toLowerCase();
    var isLocal =
      h === "localhost" ||
      h === "127.0.0.1" ||
      h === "0.0.0.0" ||
      h === "::1" ||
      h.endsWith(".local");
    if (isLocal) return "http://localhost:3700";
    return "https://app.patentforge.co.kr";
  }

  function noteFor(url) {
    if (url.indexOf("localhost") !== -1) {
      return "현재 로컬 개발 모드 — " + url + " 에서 서비스가 실행 중이어야 합니다.";
    }
    return "서비스 도메인 " + url + " 으로 이동합니다.";
  }

  function bind() {
    var url = pickPortalUrl();
    var nodes = document.querySelectorAll("[data-launch]");
    nodes.forEach(function (el) {
      if (el.tagName === "A") {
        el.setAttribute("href", url);
        el.setAttribute("rel", "noopener");
        // 같은 탭으로 이동 — 새 탭은 사용자 선택으로 (cmd/ctrl+click)
        el.setAttribute("target", "_self");
      } else {
        el.addEventListener("click", function (e) {
          e.preventDefault();
          window.location.href = url;
        });
      }
    });
    var note = document.getElementById("hero-launch-note");
    if (note) note.textContent = noteFor(url);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
})();
