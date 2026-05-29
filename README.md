# PatentForge — 소개 웹페이지

> **Multi-Agent Multi-Jurisdiction Patent Application Platform — Invention to Filing-Ready Specification (v3.4 · 2026-05-29).**
> 3개의 명확한 타겟 페르소나를 위한 도구입니다:
> - 👤 **개인 발명가 (13,000~20,000명)** → Mode B 셀프 출원, 비용 5만원
> - 🏢 **기업 R&D 특허 담당자 (~2,500개사)** → Mode C 온프레미스, 영업비밀 외부 송신 0건
> - ⚖ **AI 우호적 변리사 (~3,600명)** → Mode A 변리사 협업, 처리량 3~5배 향상
>
> 한 줄의 발명 신고를 <b>4개 관할(KIPO·USPTO·EPO·PCT)의 출원 가능 패키지</b>로 변환합니다.
> [PatentForge/README.md (v3.2)](../PatentForge/README.md) +
> [PatentForge-Guide.docx](../PatentForge/documents/PatentForge-Guide.docx) +
> [PatentForge-Legal-Positioning.md](../PatentForge/documents/PatentForge-Legal-Positioning.md) +
> [Over-Competitor.md (Phase A–F)](../PatentForge/documents/Over-Competitor.md) +
> [PatentForge-Competitive-Analysis.docx (11종 비교)](../PatentForge/documents/PatentForge-Competitive-Analysis.docx) +
> [v3-spec-final-review.md (재귀적 셀프 출원)](../PatentForge/documents/v3-spec-final-review.md)
> 의 6개 출처 문서를 30개 섹션으로 재구성한 정적 웹사이트입니다.

🌐 **Live**: https://wdlab1958.github.io/PatentForge-Webpage/

---

## 0. 한눈에 보기

| 항목 | 값 |
| --- | --- |
| 기술 스택 | Vanilla HTML / CSS / JavaScript (의존성 0) |
| 디자인 시스템 | Neumorphism — convex/concave 그림자 + LED glow |
| 색상 의미 (v3.2) | **Emerald**=정상 진행 / Mode A / KIPO · **Amber**=HITL / Mode B / USPTO · **Cyan**=Mode C / EPO · **Pink**=BLOCKER / PCT |
| 폰트 | Noto Sans KR · Inter · JetBrains Mono (Google Fonts) |
| 반응형 | 1280 / 1024 / 720px 3 breakpoint |
| 접근성 | 시멘틱 HTML5 · `aria-label` · 키보드 스크롤 |
| 배포 | GitHub Pages (`main` branch root) |
| 섹션 수 | **30** (v1: 12 → v2: 24 → v3.2: 30) |

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

## 2. 페이지 구조 (31 sections)

PatentForge 6개 출처 문서를 다음과 같이 매핑 (✦ = v3.2 신규 섹션, ◆ = 페르소나 중심 신규):

| § | 섹션 ID | 출처 | 핵심 컴포넌트 |
| --- | --- | --- | --- |
| 1 | `#hero` | README v3.2 + 페르소나 정의 | 5 chip + Hero tagline (개인 발명가/기업 R&D/AI 우호 변리사 명시) + 6 통계 |
| 2 | `#identity` | Guide + Legal | 6 카드 (도구 vs 대리 / 3-Mode 게이팅 / metric / audit / 비용 / 오케스트라) |
| **3** | **`#personas`** ◆ | **타겟 사용자 정의** | **3 페르소나 카드 (👤 개인 발명가 13K~20K · 🏢 기업 R&D 2.5K개사 · ⚖ AI 우호 변리사 3.6K) + 모드 매핑** |
| **4** | **`#jurisdictions`** ✦ | **README §1·§9 + Over-Competitor B–D** | **4-국가 카드 (KIPO/USPTO/EPO/PCT) + 산출물 목록 + FilingProfile SSOT banner** |
| **4** | **`#engines`** ✦ | **README §1 + Over-Competitor A** | **4-엔진 도면 파이프라인 (mermaid + GraphViz + Matplotlib + Pillow) + 관할별 sheet 정규화** |
| **5** | **`#multibuild`** ✦ | **README §9** | **POST `/export/{id}/multi/build` API 코드 + 관할별 ZIP 일람표** |
| 6 | `#modes` | Legal §3~§6 | 3 운영 모드 매트릭스 (A/B/C) + Mode B 활성화 5조건 banner |
| 7 | `#legal` | Legal §2 | 변리사법 §2/§21 법문 + 합법 vs 위법 행위 7+7 표 |
| 8 | `#disclaimer` | Legal §8 | 6단계 면책 서명 흐름 + SHA-256 무결성 + 책임 분리 매트릭스 |
| 9 | `#principles` | Guide 안전 장치 | 6대 설계 원칙 — Mode-aware 게이팅 강제 |
| 10 | `#safeguards` | Guide 안전 장치 | 5단계 안전 장치 (Novelty / Robustness / BLOCKER / 검토 / Audit) |
| 11 | `#pipeline` | README §3 + Workflow-Detailed | **13-stage 파이프라인 (12 visible + 1 hidden Critic)** + post_qa_mode_router |
| 12 | `#agents` | README §1 | **10 Specialists + Critic + Translator (KO→EN)** + Tier 1/2/3 |
| 13 | `#cost` | 부록 C | 단계별 비용·시간 분포 (애니메이션 가로 막대) |
| 14 | `#tiers` | 부록 B | 위반 등급 4단계 (BLOCKER/MAJOR/MINOR/INFO) |
| 15 | `#lawmap` | 부록 A | KIPO 특허법 §29·§42 1:1 매핑 |
| 16 | `#hitl` | Guide §6 | 변리사 검토 페이지 UX (APPROVE/REVISE/ABANDON) |
| 17 | `#response` | Legal §11 | ResponseAgent (Phase 4) — 의견서 초안 + 강제 면책 |
| 18 | `#journey` | Guide §1~§7 | 8단계 사용자 여정 |
| 19 | `#outputs` | Guide §7 + Legal §9 | 모드별 표지 페이지 분기 (A/B/C) + Filing/Review |
| 20 | `#architecture` | README §4·§5 | **6-layer 아키텍처** (Frontend·Backend·LLM·Data·Documents·External) |
| 21 | `#security` | 부록 D | JWT + RBAC + ZDR + Squid + SHA-256 |
| 22 | `#roadmap` | README §11 | **v0 → v1·v2 → v3 → v3.2 NOW → v4 planned** |
| 23 | `#advertising` | Legal §12 | 광고 표현 합법 vs 위법 7+7 표 |
| 24 | `#countries` | Legal §14 | 6 국가 셀프 출원 (KR/US/JP/PCT ok · EU partial · CN blocked) |
| 25 | `#market` | Legal §17 | 3-Tier 시장 (개인 발명가 13K~20K + 기업 R&D + AI-친화 변리사) |
| **26** | **`#competitors`** ✦ | **Competitive-Analysis (6번째 가이드)** | **11×N 매트릭스 (PatentForge + 6 경쟁) + 차별 자산 7 + 약점 7 + 4분면 banner** |
| **27** | **`#self-filing`** ✦ | **v3-spec-final-review.md** | **PatentForge가 PatentForge 출원 — Score 93/100 + 6 메타 타일 + 메타 검증 3종** |
| **28** | **`#kpi`** ✦ | **README §11 v3.2** | **13 stages · ~50 min · $4.53 · 68 tests pass (Figures 17 + USPTO 14 + EPO 11 + PCT 10)** |
| 29 | `#compare` | Guide §7 | Filing vs Review docx 비교표 |
| 30 | `#future` | 부록 E + Legal §17 | 5대 기여 + 사회적 책임 + 의도적으로 *하지 않을* 일 |

✦ = v3.2 implementation update로 신규 추가된 섹션 (총 5 섹션)

---

## 3. 파일 구조

```
PatentForge-Webpage/
├── index.html         # 2178 lines — 30 sections + sidebar nav
├── css/
│   └── style.css      # 1854 lines — neumorphism + 4-juris + 3-mode visual language
├── js/
│   └── app.js         # 145 lines — scroll spy / counters / bar animation / mobile menu
├── assets/            # (reserved)
├── DESIGN.md          # DTCG 호환 디자인 시스템 문서 (Stitch / Figma plugin 호환)
└── README.md
```

### 3.1 `index.html`
- 시멘틱 `<aside class="sidebar">` + `<main class="content">` 2-pane 레이아웃
- 사이드바 11개 그룹: 시작 / **4 관할** / 3 운영 모드 / 철학 / 파이프라인 / 컴플라이언스 / 사용자 / 시스템 / 시장 / **메타** / 패러다임
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
- **`.banner.warn`** — Mode B / 회색지대 / 기업 R&D 시너지 amber inset glow 배너
- **`.juris` (4-col)** + `.juris-card.j-kipo/j-uspto/j-epo/j-pct` — v3.2 4-관할 카드 (각 관할 dpi/format spec + 산출물 목록 + flag color glow)
- **`.engines` (4-col)** + `.engine.e-2/e-3/e-4` — 4-엔진 도면 파이프라인 (mermaid·GraphViz·Matplotlib·Pillow)
- **`.compet-table`** + `.compet-row .pf-cell` (★ Unique) / `.y` (✓) / `.n` (✗) / `.p` (△) — 11×N 경쟁 비교 매트릭스
- **`.meta-card`** + `.meta-score` (94px gradient) + `.meta-grid` (6 tiles) — PatentForge 자기 자신 출원 메타 카드
- **`.api-block`** + `.verb` / `.path` / `.key` / `.str` / `.num` / `.cmt` 신택스 하이라이트 — POST `/export/{id}/multi/build` JSON 코드 블록
- **`.persona` (3-col)** + `.p-individual` (amber) / `.p-corporate` (cyan) / `.p-attorney` (emerald) — 3 타겟 페르소나 카드. icon + 시장 규모 + needs 리스트 + mode pill

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
~/ai_project/PatentForge/README.md                                          # v3.2 한눈에 보기 (구현 현황)
~/ai_project/PatentForge/documents/PatentForge-Guide.docx                   # 사용자 가이드 + 12단계 + 부록 A~F
~/ai_project/PatentForge/documents/PatentForge-Legal-Positioning.md         # 법적 포지셔닝 + 셀프 출원 모드 (다섯 번째 가이드)
~/ai_project/PatentForge/documents/PatentForge-Competitive-Analysis.docx    # 경쟁 11종 비교 (여섯 번째 가이드)
~/ai_project/PatentForge/documents/Over-Competitor.md                       # Phase A–F 4-관할 구현 계획
~/ai_project/PatentForge/documents/v3-spec-final-review.md                  # PatentForge가 자기 자신 출원 — 점수 93/100
~/ai_project/PatentForge/design.md                                          # 디자인 시스템
```

- **PatentForge/README.md** (2026-05-06 · v3.2): 4-관할 양식 + 10 specialized agents + 5-deep interrupt_before + 13-stage pipeline + 68 tests pass + $4.53/case 등 v3.2 구현 현황
- **PatentForge-Guide.docx** (2026-05-05 · v1.0): 제1부 초보 사용자 가이드 (1~8장) · 제2부 12단계 워크플로우 상세 (Stage 1~12) · 제3부 부록 A~F
- **PatentForge-Legal-Positioning.md** (2026-05-04 · v1.0 · 다섯 번째 가이드): 변리사법 §2/§21 해석 · 3가지 운영 모드 · 면책 동의서 흐름 · ResponseAgent · 광고 가이드라인 · 국가별 차이 · 시장 영향 분석
- **PatentForge-Competitive-Analysis.docx** (2026-05-04 · v1.0 · 여섯 번째 가이드): 국내 3 + 해외 7 + PatentForge = 11종 비교 매트릭스 · 차별 자산 7종 · 약점 7종 솔직 인정 · 4분면 매트릭스
- **Over-Competitor.md** (2026-05-06 · v1.0): Phase A (도면) + Phase B (USPTO) + Phase C (EPO) + Phase D (PCT) + Phase E (빌더 다형성) + Phase F (ResponseAgent) 6주 단계별 사양서
- **v3-spec-final-review.md** (2026-05-06 · v1.0): PatentForge가 자기 자신을 출원하는 재귀적 셀프 검증 — 종합 점수 93/100 + P0/P1/P2 보완 권고 + 메타 검증 3종
- 작성: WDLAB
- 대상 시스템: **PatentForge v3.4** (KIPO + USPTO + EPO + PCT 4-관할 parity 달성 + TranslatorAgent 실구현 + 운영 배포 + 결제 인프라)

---

## 7. 디자인 시스템 (DESIGN.md)

[`DESIGN.md`](DESIGN.md) 는 본 페이지의 디자인 시스템을 W3C [DTCG](https://design-tokens.github.io/community-group/format/) JSON 토큰 형식으로 정의합니다.

- Google Labs **Stitch** 가 그대로 ingest
- Figma Design Tokens 플러그인이 그대로 import
- 8 카테고리 고정: 색상 / 타이포그래피 / 간격 / 모서리 / 그림자 / 아이콘 / 모션 / 기타
- AlphaForge 백엔드 [`design.md`](../PatentForge/design.md) 와 호환되는 구조

---

## 8. 라이선스 / 저작권

© WDLAB
WDLAB Internal · Confidential. 본 사이트는 PatentForge 프로젝트의 소개 목적으로 작성되었습니다.

**관할별 법규 준수**: KIPO 특허법 §29 · §42 · 변리사법 §2 · §21 단서 (한국) · 37 CFR §§1.71–84 + MPEP §2173.05(e) (미국) · EPC Articles 78 + Rules 41–47 (유럽) · PCT Rules 5–11 + PCT-EASY 1.5 (국제). Mode A·C는 변리사 검토 강제, Mode B는 §21 단서에 따른 본인 직접 출원만 허용합니다.

⚠ **법적 면책**: 본 사이트의 모든 정보는 일반 정보 제공 목적이며, 법률 자문이 아닙니다. PatentForge 운영 전 반드시 변리사·법무법인의 자문을 받으시기 바랍니다.

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
