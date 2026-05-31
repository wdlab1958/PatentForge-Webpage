# PatentForge-Webpage 감사 보고서 (2026-05-31)

## 개요
본 프로젝트는 빌드 도구 없이 동작하는 정적 웹사이트이다(확인). 패키지 매니페스트(package.json), 빌드 스크립트, 의존성 디렉터리(node_modules)는 존재하지 않는다(확인).

구성 파일(확인):
- `/home/ubuntu-02/ai_project/PatentForge-Webpage/index.html` (2,304행, 약 129KB) — 단일 페이지 소개 사이트
- `/home/ubuntu-02/ai_project/PatentForge-Webpage/css/style.css` (1,969행) — 단일 스타일시트
- `/home/ubuntu-02/ai_project/PatentForge-Webpage/js/app.js` (146행) — 스크롤 스파이, 모바일 메뉴, reveal/카운터/바 애니메이션 등 UI 상호작용 (vanilla JS, IIFE)
- `/home/ubuntu-02/ai_project/PatentForge-Webpage/js/portal.js` (62행) — `data-launch` 요소를 호스트명에 따라 로컬(`http://localhost:3700`) 또는 운영(`https://app.patentforge.co.kr`)으로 바인딩
- `assets/` 디렉터리는 비어 있음(확인)
- 문서: `README.md`, `DESIGN.md`

스택(확인): HTML5 + CSS + 순수 JavaScript. 외부 의존성은 Google Fonts(preconnect + CSS2 링크)뿐이며 로컬 번들 라이브러리는 없다.

## 실행·테스트 결과
- `node --check js/app.js` → 통과(확인)
- `node --check js/portal.js` → 통과(확인)
- 정적 사이트이므로 빌드/tsc/lint 대상 없음(확인). 별도 서버 미기동(읽기 전용 준수).
- HTML 구조 검사(확인): `<!DOCTYPE html>` 선언, `<html lang="ko">`, `charset=utf-8`, viewport 메타, `<title>` 모두 존재. 비-void 태그 개폐 균형 불일치 없음.
- 로컬 자산 참조 3건(`css/style.css`, `js/app.js`, `js/portal.js`) 모두 실제 파일 존재(확인). 깨진 로컬 참조 없음.
- 내부 앵커 링크 검사(확인): `href="#..."` 31개가 모두 해당 `id` 대상으로 해소됨(누락 0건).
- JS가 참조하는 DOM id(`sidebar`, `menuToggle`, `toTop`, `hero-launch-note`) 각 1개씩 존재하며 `data-launch` 요소 2개 존재(확인).

## 발견된 문제점 (확인 vs 추정, 심각도)
- (확인 / 정보) `assets/` 디렉터리가 비어 있음. 현재 HTML/CSS가 로컬 이미지·아이콘을 참조하지 않으므로 깨진 참조로 이어지지 않음. 심각도: 정보(없음에 가까움).
- (추정 / 낮음) `portal.js`는 운영 진입 대상을 `https://app.patentforge.co.kr`로 가정한다. 해당 도메인의 실제 가용성은 외부 네트워크 검증을 수행하지 않았으므로 미확인(추정).
- (추정 / 낮음) Google Fonts 외부 링크는 네트워크 의존이며, 오프라인/차단 환경에서는 폰트 폴백으로 동작(추정). 기능적 결함 아님.
- 콘솔 런타임 오류: 브라우저를 기동하지 않았으므로 실측 불가(미검증). 정적 분석상 `app.js`/`portal.js`의 null 가드(`if (!target)`, `if (note)` 등)는 적절히 적용되어 있어 명세서상 오류 징후 없음(추정).

심각도 높음/중간으로 분류되는 확정 결함은 발견되지 않음(확인).

## 조치한 내용
- 코드 변경 없음. 브랜드 스크럽 잔재가 발견되지 않았고(아래 참조), 그 외 수정이 필요한 저위험 결함도 확인되지 않아 자동 수정 대상이 없었다(확인).

브랜드 스크럽 검증(확인):
- 대소문자 무시 패턴 `wdlab` / `WDLAB@2023-2026` / `wdlab` / `WDLAB@2023-2026` / `wdlab` / `wdlab` / `wdlab` 및 단독 단어 `\ba3\b` 전수 검색 → 잔재 0건.
- 추가 확장 패턴(`에이3`, `aitech`, `보안기술` 등) → 잔재 0건.
- 대체 결과 `WDLAB` 정상 반영 확인: index.html 7건, README.md 6건, DESIGN.md 6건, portal.js 1건. 이메일/도메인은 `wdlab1958@gmail.com`, `*.patentforge.co.kr`로 일관(확인).
- 유지 대상 식별자 `A3DE` / `A3-ADE`는 코드베이스에 존재하지 않아 오변환 위험 없음(확인).
- 디렉터리 미개명, `.git/` 미수정(확인).

## 미해결·위험 항목
- 운영 도메인(`app.patentforge.co.kr`) 실제 응답 여부는 읽기 전용·네트워크 미수행 원칙에 따라 미검증. 배포 전 외부 확인 권장(권고만).
- 브라우저 런타임 콘솔 오류는 서버 미기동으로 실측하지 않음. 배포 검증 단계에서 실제 로딩 후 콘솔 점검 권장(권고만).

## 종합 판단
정적 사이트로서 구조적 무결성은 양호하다(확인): JS 문법 통과, HTML 태그 균형 정상, 로컬 자산·내부 앵커 참조 누락 없음. 브랜드 스크럽은 잔재 0건으로 완전하게 적용되었다(확인). 확정된 고·중 심각도 결함은 없으며, 남은 항목은 외부 네트워크·브라우저 실행을 요하는 검증으로 본 읽기 전용 감사 범위를 벗어난다. 코드 수정 불요.
