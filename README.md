# PatentForge — 소개 웹페이지

> **AI가 작성하고, 변리사가 검토하고, 당신이 출원하는 — 한국 유일의 모드 분기형 특허 플랫폼.**
> Mode A 변리사 협업 · **Mode B 셀프 출원 (변리사법 §21 단서)** · Mode C 사내 R&D.
> [PatentForge 사용 가이드 v1.0](../PatentForge/documents/PatentForge-Guide.docx) +
> [PatentForge Legal Positioning v1.0](../PatentForge/documents/PatentForge-Legal-Positioning.md)
> 두 문서를 24개 섹션으로 재구성한 정적 웹사이트입니다.

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

## 2. 페이지 구조 (24 sections)

PatentForge 가이드 + Legal Positioning 두 문서를 다음과 같이 매핑:

| § | 섹션 ID | 출처 | 핵심 컴포넌트 |
| --- | --- | --- | --- |
| 1 | `#hero` | Guide §1 + Legal §3 | 6 통계 카운터 + 3 모드 chip + §21 단서 슬로건 |
| 2 | `#identity` | Guide §6 + Legal §2 | 6 카드 (도구 vs 대리 / 3-Mode 게이팅 / metric / audit / 비용 / 오케스트라) |
| **3** | **`#modes`** ⭐ | **Legal §3~§6** | **3 운영 모드 매트릭스 (A/B/C) + Mode B 활성화 5조건 banner** |
| **4** | **`#legal`** ⭐ | **Legal §2** | **변리사법 §2/§21 법문 + 합법 vs 위법 행위 7+7 표 + 회색지대 banner** |
| **5** | **`#disclaimer`** ⭐ | **Legal §8** | **6단계 면책 서명 흐름 + SHA-256 무결성 + 책임 분리 매트릭스** |
| 6 | `#principles` | Guide 안전 장치 | 6대 설계 원칙 — Mode-aware 게이팅 강제 |
| 7 | `#safeguards` | Guide 안전 장치 5가지 | 5단계 안전 장치 (Novelty / Robustness / BLOCKER / 검토 / Audit) |
| 8 | `#pipeline` | Guide Stage 1~12 | 12-stage 파이프라인 시각화 |
| 9 | `#agents` | Guide LLM Tier 정책 | 12 Specialist Agent — Tier 1/2/3 색 구분 |
| 10 | `#cost` | 부록 C | 단계별 비용·시간 분포 (애니메이션 가로 막대) |
| 11 | `#tiers` | 부록 B | 위반 등급 4단계 (BLOCKER/MAJOR/MINOR/INFO) |
| 12 | `#lawmap` | 부록 A | KIPO 특허법 §29·§42 1:1 매핑 |
| 13 | `#hitl` | Guide §6.2~§6.4 | 변리사 검토 페이지 UX (APPROVE/REVISE/ABANDON) |
| **14** | **`#response`** ⭐ | **Legal §11** | **ResponseAgent (Phase 3) — 의견제출통지서 OCR + 의견서·보정서 초안** |
| 15 | `#journey` | Guide §1~§7 | 8단계 사용자 여정 |
| 16 | `#outputs` | Guide §7 + Legal §9 | 모드별 표지 페이지 분기 (A/B/C) + Filing/Review |
| 17 | `#architecture` | Guide §1.1 + 부록 D | 5-layer 시스템 아키텍처 |
| 18 | `#security` | 부록 D | JWT + RBAC + ZDR + Squid + SHA-256 |
| 19 | `#roadmap` | 부록 E | v1 → v2 → v3 진화 + Phase 2~3 |
| **20** | **`#advertising`** ⭐ | **Legal §12** | **광고 표현 합법 vs 위법 7+7 표 + 표시광고법 §3 회피 가이드** |
| **21** | **`#countries`** ⭐ | **Legal §14** | **6 국가 셀프 출원 (KR/US/JP/PCT 합법 · EU 제한 · CN 차단)** |
| **22** | **`#market`** ⭐ | **Legal §17** | **3-Tier 시장 (Mode A 1.8억 + Mode B 1억 + Mode C 1억) + Brian 시너지** |
| 23 | `#compare` | Guide §7 | Filing vs Review docx 비교표 |
| 24 | `#future` | 부록 E + Legal §17 | 5대 기여 + 사회적 책임 + 의도적으로 *하지 않을* 일 |

⭐ = Legal Positioning 문서로 신규 추가된 섹션 (총 7 섹션)

---

## 3. 파일 구조

```
PatentForge-Webpage/
├── index.html         # 1633 lines — 24 sections + sidebar nav
├── css/
│   └── style.css      # 1570 lines — neumorphism + 3-mode visual language
├── js/
│   └── app.js         # 144 lines — scroll spy / counters / bar animation / mobile menu
├── assets/            # (reserved)
├── DESIGN.md          # DTCG 호환 디자인 시스템 문서 (Stitch / Figma plugin 호환)
└── README.md
```

### 3.1 `index.html`
- 시멘틱 `<aside class="sidebar">` + `<main class="content">` 2-pane 레이아웃
- 사이드바 9개 그룹: 시작 / **3 운영 모드** / 철학 / 파이프라인 / 컴플라이언스 / 사용자 / 시스템 / **시장** / 패러다임
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
- **`.modes` (3-col)** — Mode A/B/C 매트릭스 (`.m-a` emerald / `.m-b` amber / `.m-c` cyan glow)
- **`.legal-table`** + `.legal-col.allowed` / `.legal-col.forbidden` — 합법/위법 행위 비교
- **`.flow` (6-col)** + `.flow-step.is-warn` — 면책 동의서 6단계 amber 강조
- **`.countries` (3×2-col)** + `.country.ok` / `.partial` / `.blocked` — 6 국가 셀프 출원 가능성
- **`.market` (3-col)** + `.market-seg.s-a` / `.s-b` / `.s-c` — 3-Tier 시장 분석
- **`.ad-table`** + `.ad-row .ok` / `.no` (line-through) — 광고 표현 합법/위법
- **`.banner.warn`** — Mode B / 회색지대 / Brian 시너지 amber inset glow 배너

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

본 페이지의 모든 텍스트는 다음 출처에서 발췌했습니다:

```
~/ai_project/PatentForge/documents/PatentForge-Guide.docx                  # 사용자 가이드 + 12단계 + 부록 A~F
~/ai_project/PatentForge/documents/PatentForge-Legal-Positioning.md        # 법적 포지셔닝 + 셀프 출원 모드 (다섯 번째 가이드)
~/ai_project/PatentForge/design.md                                          # 디자인 시스템
```

- **PatentForge-Guide.docx** (2026-05-05 · v1.0): 제1부 초보 사용자 가이드 (1~8장) · 제2부 12단계 워크플로우 상세 (Stage 1~12) · 제3부 부록 A~F
- **PatentForge-Legal-Positioning.md** (2026-05-04 · v1.0 · 다섯 번째 가이드): 변리사법 §2/§21 해석 · 3가지 운영 모드 · 면책 동의서 흐름 · ResponseAgent · 광고 가이드라인 · 국가별 차이 · 시장 영향 분석
- 작성: Brian Lee · WDLAB
- 대상 시스템: PatentForge v3.0 (MVP v1.0 + Mode B/C 추가 계획)

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

KIPO 특허법 §29 · §42 · 변리사법 §2 · §21 단서 준수. Mode A·C는 변리사 검토 강제, Mode B는 §21 단서에 따른 본인 직접 출원만 허용합니다.

⚠ **법적 면책**: 본 사이트의 모든 정보는 일반 정보 제공 목적이며, 법률 자문이 아닙니다. PatentForge 운영 전 반드시 변리사·법무법인의 자문을 받으시기 바랍니다.

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
