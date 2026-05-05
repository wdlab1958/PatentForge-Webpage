# PatentForge — 소개 웹페이지

> **KIPO 출원 가능 명세서를 12단계 멀티에이전트 파이프라인으로 자동 생성하는 변리사 협업 플랫폼**의 소개 사이트.
> [PatentForge 사용 가이드 v1.0](../PatentForge/documents/PatentForge-Guide.docx) (제1부 사용자 가이드 + 제2부 12단계 워크플로우 상세 + 제3부 부록 A~F) 의 핵심을
> 12개 섹션으로 재구성한 정적 웹사이트입니다.

🌐 **Live**: https://wdlab1958.github.io/PatentForge-Webpage/

---

## 0. 한눈에 보기

| 항목 | 값 |
| --- | --- |
| 기술 스택 | Vanilla HTML / CSS / JavaScript (의존성 0) |
| 디자인 시스템 | Neumorphism — convex/concave 그림자 + LED glow |
| 색상 의미 | **Emerald(#10B981)**=정상 진행 · **Amber(#F4A11C)**=HITL 게이트 · **Pink(#FF2D95)**=BLOCKER · **Cyan(#00B8D4)**=보조 정보 |
| 폰트 | Noto Sans KR · Inter · JetBrains Mono (Google Fonts) |
| 반응형 | 1280 / 1024 / 720px 3 breakpoint |
| 접근성 | 시멘틱 HTML5 · `aria-label` · 키보드 스크롤 |
| 배포 | GitHub Pages (`main` branch root) |

---

## 1. 디자인 의사결정

### 1.1 Reference: WDLAB-AlphaForge / WDLAB-LLMOps Webpage
같은 visual language(뉴모피즘 사이드바 네비, raised/pressed 그림자, chip, stat card, 비교표, 타임라인 패턴)를 공유합니다. 컨텐츠는 모두 PatentForge 사용 가이드와 워크플로우 12단계 문서에서 새로 작성.

### 1.2 색상 정의 — 도메인이 다르면 위험 색상도 다르다
PatentForge의 위험 시그널은 AlphaForge와 의미가 다릅니다.

| 요소 | AlphaForge (자동매매) | **PatentForge (특허 출원)** |
| --- | --- | --- |
| 정상 / 진행 시그널 | `cyan` (#00B8D4) | **`emerald`** (#10B981) — 법적 정상 진행 |
| 경고 / 일시 상태 | `amber` (#F4A11C) | **`amber` 일급 시민화** — HITL 게이트 (Stage 3·10) |
| 위험 / 정지 시그널 | `pink` (#FF2D95) | **`pink`** (#FF2D95) — **BLOCKER 한정** |

**약속**
- 일상 정보(파이프라인 정상 진행 stat, 사용자 가이드 스텝)에는 절대 pink 사용 금지
- HITL이 아닌 정보 카드에는 amber 사용 금지
- cyan은 보조 정보(파일 형식 chip, Tier 3 agent badge)에만 사용

이 약속에 따라:
- `Stage 3 Novelty` / `Stage 10 Review` 카드 → amber inset glow (HITL 강조)
- `Stage 12 Done` 카드 → emerald inset glow (최종 완료)
- `BLOCKER tier` / `gate-tag.tg-block` → pink inset glow (출원 불가)
- `Tier 1 (Claude Sonnet 4.6) 에이전트` → emerald inset glow (법적 추론 정확성)

### 1.3 디자인 != 컨텐츠
참조 페이지(AlphaForge / LLMOps)의 컨텐츠는 일절 가져오지 않았습니다. 모든 텍스트는 PatentForge 가이드 문서 (제1부 8장 + 제2부 Stage 1~12 + 제3부 부록 A~F) 원문에서 발췌·요약했습니다.

---

## 2. 페이지 구조 (12 sections)

가이드북의 사용자 가이드 + 12단계 워크플로우 + 부록 A~F를 다음과 같이 매핑:

| § | 섹션 ID | 가이드 출처 | 핵심 컴포넌트 |
| --- | --- | --- | --- |
| 1 | `#hero` | 제1부 §1 / 부록 C | 6개 핵심 통계 카운터 + KIPO §29·§42·변리사법 §2 chip |
| 2 | `#identity` | 제1부 §6 / 부록 D | 6 identity 카드 (변리사 협업 도구 / 무인 출원 불허 / 측정 가능 metric / Hash-Chained Audit / 비용 회로 / 오케스트라) |
| 3 | `#principles` | 제2부 안전 장치 + 부록 A | 6대 설계 원칙 — 변리사법 §2 / HITL / metric / BLOCKER / 영업비밀 / audit log |
| 4 | `#safeguards` | 제2부 §전체 안전 장치 5가지 | 5단계 안전 장치 (Novelty 회색지대 / Robustness / BLOCKER / 변리사 검토 / Audit) |
| 5 | `#pipeline` | 제2부 Stage 1~12 | 12-stage 파이프라인 시각화 (HITL/final 변형) |
| 6 | `#agents` | 제2부 LLM Tier 정책 | 12 Specialist Agent — Tier 1/2/3 색 구분 |
| 7 | `#cost` | 부록 C | 단계별 비용·시간 분포 (애니메이션 가로 막대) |
| 8 | `#tiers` | 부록 B | 위반 등급 4단계 (BLOCKER/MAJOR/MINOR/INFO) |
| 9 | `#law` | 부록 A | KIPO 특허법 §29·§42 + 변리사법 §2 1:1 매핑 |
| 10 | `#hitl` | 제1부 §6.2~§6.4 | 변리사 검토 페이지 UX (APPROVE/REVISE/ABANDON + 3 점수) |
| 11 | `#journey` | 제1부 §1~§7 | 8단계 사용자 여정 (로그인 → 다운로드) |
| 12 | `#outputs` | 제1부 §7 | Filing / Review docx + .pdf · ePAS · .hwp · checklist |
| 13 | `#architecture` | 제1부 §1.1 + 부록 D | 5-layer 시스템 아키텍처 (Frontend/Backend/LLM/Data/External) |
| 14 | `#security` | 부록 D | JWT + RBAC + ZDR + Squid + SHA-256 hash chain |
| 15 | `#roadmap` | 부록 E | v1 → v2 → v3 진화 + Phase 2~3 |
| 16 | `#compare` | 제1부 §7 | Filing vs Review docx 비교표 |
| 17 | `#future` | 부록 E + 구현 우선순위 | 5대 기여 영역 + 사회적 책임 + 의도적으로 *하지 않을* 일 |

---

## 3. 파일 구조

```
PatentForge-Webpage/
├── index.html         # 1159 lines — 12 sections + sidebar nav
├── css/
│   └── style.css      # 1149 lines — neumorphism design system
├── js/
│   └── app.js         # 143 lines — scroll spy / counters / bar animation / mobile menu
├── assets/            # (reserved)
├── DESIGN.md          # DTCG 호환 디자인 시스템 문서 (Stitch / Figma plugin 호환)
└── README.md
```

### 3.1 `index.html`
- 시멘틱 `<aside class="sidebar">` + `<main class="content">` 2-pane 레이아웃
- 사이드바 7개 그룹: 시작 / 철학 / 파이프라인 / 컴플라이언스 / 사용자 / 시스템 / 패러다임
- 모바일 < 720px 에서는 햄버거 토글로 슬라이드 인

### 3.2 `css/style.css`
디자인 토큰 (line 9~49):

```css
--bg:           #E6E9EF;          /* base surface */
--led-emerald:  #10B981;          /* 법적 정상 진행 */
--led-amber:    #F4A11C;          /* HITL 게이트 일급 시민 */
--led-pink:     #FF2D95;          /* BLOCKER / 정지 한정 */
--led-cyan:     #00B8D4;          /* 보조 정보 (Tier 3, 파일 형식) */
--shadow-raised:  9px 9px 22px var(--shadow-dark), -9px -9px 22px var(--shadow-light);
--shadow-pressed: inset 6px 6px 12px var(--shadow-dark), inset -6px -6px 12px var(--shadow-light);
```

핵심 컴포넌트 클래스:
- `.neu-raised` / `.neu-pressed` — 뉴모피즘 유틸리티
- `.principles` (3-col) — 6대 설계 원칙
- `.gates` (5-col) — 5단계 안전 장치
- `.pipeline` (6-col) — 12-stage 파이프라인 (`.is-hitl` / `.is-final` 변형)
- `.agents` (4-col) — 12 에이전트 (`.tier-1` / `.tier-2` / `.tier-3` glow 변형)
- `.tiers` (4-col) — BLOCKER/MAJOR/MINOR/INFO
- `.journey` (4-col, 2-row) — 8단계 사용자 여정 + gradient num
- `.outputs` (2-col) — Filing / Review 비교
- `.bars` + `.bar-track` + `.bar-fill` — 단계별 비용·시간 가로 막대
- `.compare-row` — Filing vs Review 비교표

### 3.3 `js/app.js`
- **Smooth scroll** + 사이드바 active 동기화
- **Scroll spy** — 스크롤 위치 따라 사이드바 자동 하이라이트
- **IntersectionObserver reveal** — 카드 fade-in (threshold 0.12)
- **Counter animation** — 숫자 통계 0→target 1.1s ease-out
- **Bar animation** — `.bar-fill` width 0% → `data-w` 진입 시 1회 (threshold 0.4)
- **Mobile menu** — 720px 이하에서 햄버거 토글
- **To-top button** — 600px 이상 스크롤 시 노출

---

## 4. 로컬 실행

의존성이 없으므로 어떤 정적 서버라도 됩니다.

```bash
# Python
python3 -m http.server 8870
# Node
npx serve -l 8870 .
# 브라우저
open http://localhost:8870/
```

---

## 5. 배포

GitHub Pages로 배포되어 있습니다 (`main` 브랜치 루트).

```
https://wdlab1958.github.io/PatentForge-Webpage/
```

GitHub Pages는 정적 파일만 호스팅하므로 빌드 단계 없음.
변경 사항은 `main`에 푸시하면 1~2분 내 자동 반영됩니다.

---

## 6. 컨텐츠 출처 (Single Source of Truth)

본 페이지의 모든 텍스트는 다음 단일 출처에서 발췌했습니다:

```
~/ai_project/PatentForge/documents/PatentForge-Guide.docx
~/ai_project/PatentForge/design.md
```

- 제1부 초보 사용자 가이드 (1~8장)
- 제2부 12단계 워크플로우 상세 (Stage 1~12)
- 제3부 부록 A (KIPO 특허법) / B (컴플라이언스) / C (비용·시간) / D (보안) / E (v1·v2·v3 진화) / F (트러블슈팅)
- 작성: Brian Lee · WDLAB
- 발행: 2026-05-05 (PatentForge v3.0 대상)

---

## 7. 디자인 시스템 (DESIGN.md)

[`DESIGN.md`](DESIGN.md) 는 본 페이지의 디자인 시스템을 W3C [DTCG](https://design-tokens.github.io/community-group/format/) JSON 토큰 형식으로 정의합니다.

- Google Labs **Stitch** 가 그대로 ingest
- Figma Design Tokens 플러그인이 그대로 import
- 8 카테고리 고정: 색상 / 타이포그래피 / 간격 / 모서리 / 그림자 / 아이콘 / 모션 / 기타
- AlphaForge 백엔드 [`design.md`](../PatentForge/design.md) 와 호환되는 구조

---

## 8. 라이선스 / 저작권

© WDLAB · Brian Lee
WDLAB Internal · Confidential. 본 사이트는 PatentForge 프로젝트의 소개 목적으로 작성되었습니다.

KIPO 특허법 §29 · §42 · 변리사법 §2 준수. 어떠한 자동 출원도 허용하지 않습니다.

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
