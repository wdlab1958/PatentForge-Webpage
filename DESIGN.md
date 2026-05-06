# Design System — PatentForge Webpage

> **Spec compatibility**: W3C [Design Tokens Community Group (DTCG)](https://design-tokens.github.io/community-group/format/) JSON token format · [Google Labs **Stitch**](https://stitch.withgoogle.com) ingestion · [Figma Design Tokens plugin](https://github.com/lukasoppermann/design-tokens) compatible
> **Status**: 2026-05-06 · v1.1 · light-mode only · Legal Positioning (3-Mode) 컴포넌트 추가
> **Source of truth code-side**: [`css/style.css`](css/style.css) (token block lines 9–49)
> **Author**: Brian Lee · WDLAB
> **Parent system**: derived from [`PatentForge/design.md`](../PatentForge/design.md) and the WDLAB-AlphaForge / WDLAB-LLMOps page series. PatentForge's accent palette is intentionally different — emerald replaces cyan to signal "법적 정상 진행", and amber is promoted to a first-class accent for HITL gates.

---

## 0. 통합 가이드

### 0-1. 본 문서의 위치

```
PatentForge-Webpage/
├── DESIGN.md               ← 본 문서
├── index.html              ← 단일 페이지 마크업 (12개 섹션)
├── css/style.css           ← 토큰 + 컴포넌트 구현
├── js/app.js               ← 스크롤 스파이 / counter / bar 애니메이션
└── assets/                 ← 정적 자원 (현재 비어 있음 — emoji-first 정책)
```

본 문서는 PatentForge 프로젝트의 **소개용 웹 페이지** 디자인 시스템입니다. 백엔드/대시보드 UI(`apps/frontend/`)와는 분리되며, 외부 발표용 단일 페이지에 한해 적용됩니다. WDLAB-AlphaForge / WDLAB-LLMOps Webpage와 같은 visual language를 공유하되, **위험 신호 색상이 다르게 매핑됩니다** (§1-1 참조).

### 0-2. 카테고리 8가지 (고정)

PatentForge 백엔드 design.md 와 동일한 카테고리 구조를 유지합니다. 카테고리 추가 / 제거 / 재명명은 *호환성 깨짐*으로 간주합니다.

1. **색상 (Color)** — 표면, 잉크, emerald(정상) / amber(HITL) / pink(BLOCKER)
2. **타이포그래피 (Typography)** — 폰트 패밀리, 크기, 가중치, 자간
3. **간격 (Spacing)** — padding / margin / gap 척도
4. **모서리 (Radius)** — border-radius 척도
5. **그림자 (Shadow)** — 양각 / 음각 / 호버 / accent 글로
6. **아이콘 (Icons)** — 의미별 이모지 + 정적 SVG 정책
7. **모션 (Motion)** — 트랜지션, 키프레임, easing
8. **기타 (Other)** — z-index, opacity, breakpoints, layout

각 카테고리는 §1~§8 으로 1:1 매핑됩니다.

### 0-3. AlphaForge / LLMOps 페이지와의 차이점

같은 visual language를 공유하지만, **도메인이 다르므로 위험 색상의 의미가 다릅니다**.

| 요소 | AlphaForge (자동매매) | PatentForge (특허 출원) |
|---|---|---|
| 정상 / 진행 시그널 | `cyan` (#00B8D4) | **`emerald`** (#10B981) |
| 위험 / 정지 시그널 | `pink` (#FF2D95) | **`pink`** (#FF2D95) — BLOCKER 한정 |
| 경고 / 일시 상태 | `amber` (#F4A11C) | **`amber`** — HITL 게이트 일급 시민 |

> **이 차이는 의미적입니다.** AlphaForge의 cyan 은 "자본을 보호하는 주의 신호"이지만, PatentForge의 emerald 는 "법적 정상 진행". 색상이 다른 이유는 두 도메인의 사용자가 즉각적으로 구분해야 하기 때문입니다. PatentForge 페이지에서 cyan 은 보조적 역할(파일 형식 chip, 부가 정보)에만 사용됩니다.

### 0-4. DTCG 토큰 표기 (Stitch / Figma 호환)

본 문서의 모든 토큰 블록은 다음 형식을 따릅니다.

```jsonc
{
  "color": {
    "led": {
      "emerald": {
        "$value": "#10B981",
        "$type": "color",
        "$description": "법적 정상 진행 / pipeline OK"
      }
    }
  }
}
```

토큰 참조는 `{path.to.token}` 형식: `"$value": "{color.led.emerald}"`.

---

## 1. 색상 (Color)

### 1-1. 의미적 팔레트

뉴모피즘 디자인의 핵심 원칙: **색은 의미입니다.** 일상 정보에는 grayscale, accent 3색은 각자 명확한 사용처가 있습니다.

| 토큰 그룹 | 역할 | 사용 가능 영역 |
|---|---|---|
| `color.surface.*` | 배경, 카드, 모달 | 모든 영역 |
| `color.ink.*` | 텍스트, 아이콘 | 모든 영역 |
| `color.led.emerald` | 정상 진행 / 등록 가능 | 12-stage pipeline OK 표시, Tier 1 agent badge, APPROVE 버튼 |
| `color.led.amber` | HITL 게이트 / REVISE / MAJOR | Stage 3·10 HITL, 변리사 검토 카드, MAJOR tier |
| `color.led.pink` | BLOCKER / ABANDON / 정지 | BLOCKER 위반 표시, ABANDON 버튼, kill switch |
| `color.led.cyan` | 보조 정보 (Tier 3, 파일 형식) | 일상 정보 보조 — 위험 신호 아님 |

**위반 사례 (절대 금지)**:
- 일상 정보(파이프라인 정상 진행 stat, 사용자 가이드 스텝)에 pink 사용
- HITL이 아닌 정보 카드에 amber 사용
- 본 토큰 외 hex 직접 입력 (반드시 토큰 경유)

### 1-2. DTCG JSON

```json
{
  "color": {
    "surface": {
      "DEFAULT": { "$value": "#E6E9EF", "$type": "color", "$description": "기본 표면 — 뉴모피즘 카드 배경" },
      "soft":    { "$value": "#ECEFF4", "$type": "color", "$description": "음각 안쪽 표면" },
      "elevated":{ "$value": "#E8ECF1", "$type": "color", "$description": "약간 높은 표면" }
    },
    "ink": {
      "1": { "$value": "#2C3E50", "$type": "color", "$description": "본문 텍스트" },
      "2": { "$value": "#5A6478", "$type": "color", "$description": "보조 텍스트" },
      "3": { "$value": "#8E97AC", "$type": "color", "$description": "라벨, 캡션, hint" }
    },
    "led": {
      "emerald":   { "$value": "#10B981", "$type": "color", "$description": "법적 정상 / 등록 가능 / APPROVE" },
      "emerald-2": { "$value": "#34D399", "$type": "color", "$description": "emerald gradient end" },
      "amber":     { "$value": "#F4A11C", "$type": "color", "$description": "HITL 게이트 / REVISE / MAJOR" },
      "amber-2":   { "$value": "#FBBF24", "$type": "color", "$description": "amber gradient end" },
      "pink":      { "$value": "#FF2D95", "$type": "color", "$description": "BLOCKER / ABANDON — 위험 한정" },
      "pink-2":    { "$value": "#FF6FB5", "$type": "color", "$description": "pink gradient end" },
      "cyan":      { "$value": "#00B8D4", "$type": "color", "$description": "보조 정보 (Tier 3, 파일 형식)" },
      "green":     { "$value": "#2ecc71", "$type": "color", "$description": "live status pulse — sidebar footer 한정" }
    },
    "glow": {
      "emerald": { "$value": "rgba(16, 185, 129, 0.42)", "$type": "color" },
      "amber":   { "$value": "rgba(244, 161, 28, 0.45)", "$type": "color" },
      "pink":    { "$value": "rgba(255, 45, 149, 0.45)", "$type": "color" },
      "cyan":    { "$value": "rgba(0, 184, 212, 0.40)", "$type": "color" }
    },
    "shadow-source": {
      "light":  { "$value": "#FFFFFF", "$type": "color", "$description": "양각 light 광원" },
      "dark":   { "$value": "#C5CCD9", "$type": "color", "$description": "양각 dark 그림자" },
      "darker": { "$value": "#A3B1C6", "$type": "color", "$description": "강조 음영" }
    }
  }
}
```

### 1-3. 사용 예시 (CSS 클래스 ↔ 토큰 매핑)

```html
<!-- ✅ correct -->
<div class="neu-raised">정상 카드</div>
<span class="text-em">통과 / 등록 가능</span>
<span class="gate-tag tg-block">BLOCKER</span>
<span class="gate-tag tg-current">변리사 검토</span>
<span class="text-cy">.json · 파일 형식 보조</span>

<!-- ❌ forbidden -->
<div style="background:#E6E9EF">...</div>           <!-- 토큰 미경유 -->
<span class="text-pk">사건 진행 중</span>           <!-- 일상 정보에 BLOCKER 색상 -->
<span class="gate-tag tg-block">MINOR</span>        <!-- BLOCKER 색상을 MINOR에 -->
```

---

## 2. 타이포그래피 (Typography)

### 2-1. 폰트 패밀리

| 토큰 | 사용처 |
|---|---|
| `typography.family.sans` | 본문, 헤딩, UI 일반 — 한국어/영어 혼용 |
| `typography.family.mono` | Stage tag, 파일명, audit hash, kbd, gate-meta, 비용 수치 |

본 페이지는 한국어가 주 언어이므로 `Noto Sans KR`을 1차 fallback으로 둡니다.

### 2-2. DTCG JSON

```json
{
  "typography": {
    "family": {
      "sans": {
        "$value": ["Noto Sans KR", "Inter", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        "$type": "fontFamily",
        "$description": "한국어 우선, 영어 혼용"
      },
      "mono": {
        "$value": ["JetBrains Mono", "ui-monospace", "monospace"],
        "$type": "fontFamily",
        "$description": "tabular 숫자 + audit hash 가독성"
      }
    },
    "size": {
      "xs":   { "$value": "0.75rem",  "$type": "dimension", "$description": "12px — chip, 라벨" },
      "sm":   { "$value": "0.875rem", "$type": "dimension", "$description": "14px — 본문 보조" },
      "base": { "$value": "1rem",     "$type": "dimension", "$description": "16px — section-lead" },
      "lg":   { "$value": "1.125rem", "$type": "dimension", "$description": "18px — 카드 헤더" },
      "xl":   { "$value": "1.25rem",  "$type": "dimension", "$description": "20px — Stat 메트릭 값" },
      "2xl":  { "$value": "1.5rem",   "$type": "dimension", "$description": "24px — 섹션 제목 보조" },
      "3xl":  { "$value": "2rem",     "$type": "dimension", "$description": "32px — Stat 메트릭 큰 값" },
      "h2":   { "$value": "2.375rem", "$type": "dimension", "$description": "38px — section h2" },
      "hero": { "$value": "clamp(48px, 7vw, 96px)", "$type": "dimension", "$description": "Hero h1 fluid" }
    },
    "weight": {
      "normal":   { "$value": 400, "$type": "fontWeight" },
      "medium":   { "$value": 500, "$type": "fontWeight" },
      "semibold": { "$value": 600, "$type": "fontWeight", "$description": "헤더 기본" },
      "bold":     { "$value": 700, "$type": "fontWeight", "$description": "강조 한정" },
      "extrabold":{ "$value": 800, "$type": "fontWeight", "$description": "Hero / Stat 한정" }
    },
    "tracking": {
      "tight":    { "$value": "-0.04em","$type": "dimension", "$description": "Hero 제목" },
      "snug":     { "$value": "-0.02em","$type": "dimension", "$description": "section h2" },
      "normal":   { "$value": "-0.01em","$type": "dimension", "$description": "본문" },
      "wide":     { "$value": "0.04em", "$type": "dimension", "$description": "mono tag" },
      "widest":   { "$value": "0.18em", "$type": "dimension", "$description": "uppercase nav-label" }
    },
    "line-height": {
      "tight":  { "$value": 1.05, "$type": "number", "$description": "Hero" },
      "snug":   { "$value": 1.3,  "$type": "number" },
      "normal": { "$value": 1.65, "$type": "number", "$description": "body 기본" },
      "loose":  { "$value": 1.75, "$type": "number" }
    }
  }
}
```

### 2-3. 권장 조합

| 용도 | CSS 클래스 / 토큰 조합 |
|---|---|
| Hero 제목 | `.hero-title` — sans + size.hero + weight.extrabold + tracking.tight |
| 섹션 h2 | `.section-head h2` — sans + size.h2 + weight.extrabold + tracking.snug |
| 카드 제목 | `.card h3` — sans + size.lg + weight.bold + tracking.normal |
| 섹션 라벨 (uppercase) | `.section-tag` — sans + size.xs + weight.bold + tracking.widest + text-2 |
| 본문 lead | `.section-lead` — sans + size.base + weight.normal + line-height.loose + text-2 |
| 메트릭 숫자 | `.stat-number` — Inter sans + size 42px + weight.extrabold + tracking.tight |
| Stage tag / mono pill | `.stage-meta` — JetBrains Mono + size.xs + tracking.wide + text-3 |
| kbd 단축키 | `.kbd` — JetBrains Mono + size 10.5px + neu-pressed-sm |

---

## 3. 간격 (Spacing)

### 3-1. 척도

```json
{
  "spacing": {
    "0":   { "$value": "0",        "$type": "dimension" },
    "1":   { "$value": "0.25rem",  "$type": "dimension", "$description": "4px" },
    "2":   { "$value": "0.5rem",   "$type": "dimension", "$description": "8px" },
    "3":   { "$value": "0.75rem",  "$type": "dimension", "$description": "12px" },
    "4":   { "$value": "1rem",     "$type": "dimension", "$description": "16px" },
    "5":   { "$value": "1.25rem",  "$type": "dimension", "$description": "20px — card padding-x" },
    "6":   { "$value": "1.5rem",   "$type": "dimension", "$description": "24px — gap-3" },
    "7":   { "$value": "1.625rem", "$type": "dimension", "$description": "26px — card padding" },
    "8":   { "$value": "1.875rem", "$type": "dimension", "$description": "30px — card padding lg" },
    "10":  { "$value": "2.25rem",  "$type": "dimension", "$description": "36px — section heading bottom" },
    "12":  { "$value": "3rem",     "$type": "dimension", "$description": "48px — content padding" },
    "13":  { "$value": "3.25rem",  "$type": "dimension", "$description": "52px — section vertical" },
    "16":  { "$value": "4rem",     "$type": "dimension", "$description": "64px — hero top" }
  }
}
```

### 3-2. 권장 사용처

| 패턴 | 토큰 | 위치 |
|---|---|---|
| 카드 inner padding | `spacing.7 / spacing.8` | `.card`, `.principle`, `.gate`, `.tl-item` |
| 작은 카드 padding | `spacing.5 / spacing.6` | `.pipeline-step`, `.agent`, `.stat-card` |
| 버튼 padding (X / Y) | `spacing.8 / spacing.4` | `.btn-neu` |
| 섹션 vertical padding | `spacing.13` | `.section` |
| Hero top padding | `spacing.16` | `.section-hero` |
| Sidebar padding | `26px 18px 20px` | `.sidebar` (코드 직접) |
| Content lateral padding | `spacing.12` | `.content` (≥ 1024px) |
| Grid gap (cards) | `spacing.6` | `.grid-3`, `.grid-2` |
| Grid gap (small items) | `spacing.5` | `.pipeline`, `.gates`, `.agents` |

---

## 4. 모서리 (Radius)

```json
{
  "radius": {
    "none":  { "$value": "0",       "$type": "dimension" },
    "sm":    { "$value": "10px",    "$type": "dimension", "$description": "작은 chip — alias --radius-sm" },
    "md":    { "$value": "16px",    "$type": "dimension", "$description": "버튼 / Hero stat — alias --radius-md" },
    "lg":    { "$value": "22px",    "$type": "dimension", "$description": "카드 기본 — alias --radius-lg" },
    "xl":    { "$value": "32px",    "$type": "dimension", "$description": "Hero 강조 — alias --radius-xl" },
    "full":  { "$value": "9999px",  "$type": "dimension", "$description": "원형 — LED, FAB, status pill chip" }
  }
}
```

### 4-1. 컴포넌트별 기본 모서리

| 컴포넌트 | 토큰 |
|---|---|
| `.neu-raised` / `.neu-pressed` 기본 | `radius.lg` (22px) |
| `.card`, `.principle`, `.gate`, `.tl-item` | `radius.lg` |
| `.pipeline-step`, `.agent`, `.tier` | `radius.lg` |
| `.btn-neu` | `radius.md` (16px) |
| `.brand-logo` | `radius.md` |
| `.chip`, `.gate-tag`, `.tl-tag`, `.section-tag` | `9999px` (pill) |
| `.led` (status dot) | `9999px` (full circle) |
| `.bar-track`, `.bar-fill` | 10px |

---

## 5. 그림자 (Shadow)

뉴모피즘의 핵심. **양각(raised)** / **음각(pressed)** / **accent 글로**의 3 패밀리.

### 5-1. DTCG JSON (composite)

```json
{
  "shadow": {
    "raised": {
      "$value": [
        { "color": "#C5CCD9", "offsetX": "9px",  "offsetY": "9px",  "blur": "22px", "spread": "0" },
        { "color": "#FFFFFF", "offsetX": "-9px", "offsetY": "-9px", "blur": "22px", "spread": "0" }
      ],
      "$type": "shadow",
      "$description": "양각 — 카드 휴식 상태"
    },
    "raised-sm": {
      "$value": [
        { "color": "#C5CCD9", "offsetX": "5px",  "offsetY": "5px",  "blur": "12px", "spread": "0" },
        { "color": "#FFFFFF", "offsetX": "-5px", "offsetY": "-5px", "blur": "12px", "spread": "0" }
      ],
      "$type": "shadow",
      "$description": "양각 small — 버튼 / nav-item:hover"
    },
    "pressed": {
      "$value": [
        { "color": "#C5CCD9", "offsetX": "6px",  "offsetY": "6px",  "blur": "12px", "spread": "0", "inset": true },
        { "color": "#FFFFFF", "offsetX": "-6px", "offsetY": "-6px", "blur": "12px", "spread": "0", "inset": true }
      ],
      "$type": "shadow",
      "$description": "음각 — pressed 상태 / 검증 부록"
    },
    "pressed-sm": {
      "$value": [
        { "color": "#C5CCD9", "offsetX": "3px",  "offsetY": "3px",  "blur": "7px",  "spread": "0", "inset": true },
        { "color": "#FFFFFF", "offsetX": "-3px", "offsetY": "-3px", "blur": "7px",  "spread": "0", "inset": true }
      ],
      "$type": "shadow",
      "$description": "음각 small — chip / kbd / pill"
    },
    "accent.emerald-inner": {
      "$value": [
        { "color": "rgba(16, 185, 129, 0.42)", "offsetX": "0", "offsetY": "0", "blur": "18px", "spread": "0", "inset": true }
      ],
      "$type": "shadow",
      "$description": "is-final pipeline-step / Tier 1 agent — 안쪽 emerald 글로"
    },
    "accent.amber-inner": {
      "$value": [
        { "color": "rgba(244, 161, 28, 0.45)", "offsetX": "0", "offsetY": "0", "blur": "18px", "spread": "0", "inset": true }
      ],
      "$type": "shadow",
      "$description": "is-hitl pipeline-step / Tier 2 agent — HITL 강조"
    },
    "accent.pink-inner": {
      "$value": [
        { "color": "rgba(255, 45, 149, 0.45)", "offsetX": "0", "offsetY": "0", "blur": "18px", "spread": "0", "inset": true }
      ],
      "$type": "shadow",
      "$description": "BLOCKER tier / kill switch — 위험 강조"
    },
    "led-glow.emerald": {
      "$value": [
        { "color": "rgba(16, 185, 129, 0.42)", "offsetX": "0", "offsetY": "0", "blur": "8px",  "spread": "0" },
        { "color": "rgba(16, 185, 129, 0.42)", "offsetX": "0", "offsetY": "0", "blur": "18px", "spread": "0" }
      ],
      "$type": "shadow",
      "$description": ".led-em 펄스 글로"
    }
  }
}
```

### 5-2. 상태 머신

```
┌─────────────┐  hover   ┌──────────────┐  active   ┌──────────────┐
│ shadow.     │ ───────> │ raised-sm    │ ────────> │ shadow.      │
│ raised(-sm) │  +translateY(-2px)      │           │ pressed(-sm) │
└─────────────┘ <─────── └──────────────┘ <──────── └──────────────┘
       ▲                                                    │
       └──────────── focus 해제 / 손 뗌 ───────────────────┘
```

- `.card` / `.principle` / `.gate`: raised → translateY(-3px) (마우스 오버) — shadow는 그대로
- `.btn-neu`: raised → translateY(-2px) (hover) → pressed (active) → raised (release)
- `.nav-item`: 무 → raised-sm (hover) → pressed-sm (active 페이지)
- `.btn-primary`: raised + emerald glow → raised + amber glow (hover)

### 5-3. accent 글로 사용 규칙

뉴모피즘은 색을 절제합니다. accent 글로(`accent.*-inner`)는 **상태 강조에만** 사용:

- `accent.emerald-inner` → `is-final` (Stage 12 Done 카드만), `agent.tier-1` (Claude Sonnet 4.6 사용 에이전트)
- `accent.amber-inner` → `is-hitl` (Stage 3 Novelty, Stage 10 Review), `agent.tier-2`, `gate-tag.tg-major`
- `accent.pink-inner` → `tier.t-block` (BLOCKER 카드), `gate-tag.tg-block`

일상 정보 카드(.card, .stat-card 등)에는 절대 accent 글로를 적용하지 않습니다.

---

## 6. 아이콘 (Icons)

### 6-1. 아이콘 정책

본 디자인 시스템은 PatentForge 백엔드와 동일하게 **이모지를 일급 시민**으로 채택합니다. 이유:
- 한국어 사용자에게 직관적
- 별도 아이콘 라이브러리 의존성 0
- audit log / Telegram 알림과 동일 표기

### 6-2. 의미별 매핑

```json
{
  "icon": {
    "decision.approve": { "$value": "✓",  "$type": "string", "$description": "변리사 APPROVE" },
    "decision.revise":  { "$value": "↺",  "$type": "string", "$description": "변리사 REVISE — 회귀" },
    "decision.abandon": { "$value": "✗",  "$type": "string", "$description": "변리사 ABANDON / 닫기" },
    "tier.blocker":     { "$value": "⛔", "$type": "string", "$description": "BLOCKER 위반" },
    "tier.major":       { "$value": "⚠",  "$type": "string", "$description": "MAJOR 위반" },
    "tier.minor":       { "$value": "◇",  "$type": "string", "$description": "MINOR 위반 / 자동 수정 가능" },
    "tier.info":        { "$value": "ⓘ",  "$type": "string", "$description": "INFO 통계" },
    "card.identity":    { "$value": "⌘",  "$type": "string", "$description": "Identity 카드 — 도구/협업" },
    "card.boundary":    { "$value": "⊠",  "$type": "string", "$description": "경계 / 무인 출원 불허" },
    "card.evidence":    { "$value": "▣",  "$type": "string", "$description": "Hash-chained audit" },
    "card.cost":        { "$value": "◐",  "$type": "string", "$description": "비용 회로" },
    "card.orchestra":   { "$value": "◈",  "$type": "string", "$description": "오케스트라 모델" },
    "card.shield":      { "$value": "🛡", "$type": "string", "$description": "회피설계 강건성" },
    "card.metric":      { "$value": "📊", "$type": "string", "$description": "진보성 점수" },
    "card.gear":        { "$value": "⚙",  "$type": "string", "$description": "실시가능성" },
    "led.status":       { "$value": "●",  "$type": "string", "$description": "live 펄스 (sidebar footer)" }
  }
}
```

### 6-3. 정적 SVG 정책

플랫폼 로고 / 워크플로 다이어그램 / 차트는 별도 SVG로 처리하되 다음 규칙:
- `currentColor` 만 사용 (테마 따라감)
- viewBox 고정, width/height는 부모 결정
- inline SVG만 허용 (`<img src=...>` 금지)

본 페이지에서는 LED 효과를 SVG가 아닌 CSS box-shadow + keyframes로 처리합니다 (§7-2).

---

## 7. 모션 (Motion)

### 7-1. DTCG 토큰 (duration / cubicBezier 만 표준화됨)

```json
{
  "motion": {
    "duration": {
      "instant":   { "$value": "0ms",   "$type": "duration" },
      "fast":      { "$value": "150ms", "$type": "duration", "$description": "버튼 active" },
      "normal":    { "$value": "250ms", "$type": "duration", "$description": "카드 hover translateY" },
      "slow":      { "$value": "300ms", "$type": "duration", "$description": "카드 transform 강조" },
      "scroll":    { "$value": "600ms", "$type": "duration", "$description": "reveal-on-scroll fade" },
      "counter":   { "$value": "1100ms","$type": "duration", "$description": "stat-number 카운터" },
      "pulseLed":  { "$value": "2400ms","$type": "duration", "$description": "LED 펄스 주기" },
      "pulseGlow": { "$value": "2600ms","$type": "duration", "$description": "pulse-card 글로 펄스" },
      "pulseLive": { "$value": "1800ms","$type": "duration", "$description": "sidebar footer status pulse" }
    },
    "easing": {
      "linear": { "$value": [0,    0,   1,   1   ], "$type": "cubicBezier" },
      "in":     { "$value": [0.4,  0,   1,   1   ], "$type": "cubicBezier" },
      "out":    { "$value": [0,    0,   0.2, 1   ], "$type": "cubicBezier" },
      "ease-default": { "$value": "ease", "$type": "cubicBezier", "$description": "transition 기본 — neumorphism 변화" }
    },
    "transition": {
      "card":   { "$value": { "duration": "{motion.duration.slow}",   "timingFunction": "ease" }, "$type": "transition" },
      "button": { "$value": { "duration": "{motion.duration.fast}",   "timingFunction": "ease" }, "$type": "transition" },
      "fadeIn": { "$value": { "duration": "{motion.duration.scroll}", "timingFunction": "ease" }, "$type": "transition" }
    }
  }
}
```

### 7-2. 키프레임 (DTCG 표준 외 — 코드 직접)

DTCG는 키프레임 / 시퀀스 표준이 없습니다. 본 시스템은 다음 4개 키프레임만 코드에 직접 정의합니다.

```css
/* css/style.css */
@keyframes pulseEm   { /* led-em 펄스 — emerald */ }
@keyframes pulseAm   { /* led-am 펄스 — amber, delay 0.6s */ }
@keyframes pulsePk   { /* led-pk 펄스 — pink,  delay 1.2s */ }
@keyframes livePulse { /* sidebar footer 녹색 status */ }
@keyframes glowPulse { /* pulse-card 외곽 blur 글로 */ }
```

다른 키프레임 도입은 디자인 토큰 외부 (CSS) 에서 정의하고 그 사용을 *상태 강조 한정*으로 제한합니다.

### 7-3. 모션 사용 규칙

- **모든 인터랙션은 `duration.slow` (300ms) 이내로**. hover 시 translateY 는 -2~-4px 한정.
- **무한 반복은 LED + pulse-card 한정**. 일상 정보 자동 이동 / 회전 / 펄스 금지.
- **prefers-reduced-motion 존중** (TODO: v1.1에서 추가). OS 레벨에서 끄면 모든 transition 0ms.
- **reveal-on-scroll** 은 IntersectionObserver threshold 0.12 → opacity 0→1 + translateY 18px→0.
- **stat-number 카운터** 는 cubic ease-out, threshold 0.5 진입 시 1회만 실행.
- **bar-fill 너비 애니메이션** 은 IntersectionObserver threshold 0.4, `width 0% → data-w`.

---

## 8. 기타 (Other)

DTCG가 표준화하지 않은 보조 메타데이터.

### 8-1. z-index

```json
{
  "z-index": {
    "base":         { "$value": 0,   "$type": "number" },
    "menu-toggle":  { "$value": 110, "$type": "number", "$description": "모바일 햄버거 — sidebar(100) 위" },
    "sidebar":      { "$value": 100, "$type": "number" },
    "to-top":       { "$value": 200, "$type": "number", "$description": "to-top FAB — 모든 컨텐츠 위" },
    "pulse-card":   { "$value": -1,  "$type": "number", "$description": "::before 글로를 카드 뒤로" }
  }
}
```

### 8-2. opacity

```json
{
  "opacity": {
    "reveal-start": { "$value": 0,    "$type": "number", "$description": "scroll-reveal 시작" },
    "soft":         { "$value": 0.5,  "$type": "number" },
    "muted":        { "$value": 0.7,  "$type": "number" },
    "full":         { "$value": 1.0,  "$type": "number" }
  }
}
```

### 8-3. breakpoints (DTCG 표준 외 — Tailwind 기본값)

> ⚠️ DTCG 명세에 breakpoint 토큰 타입이 아직 없습니다. 본 v1.0 은 다음 3개 분기점만 사용합니다.

```json
{
  "breakpoint": {
    "xl":    { "$value": "1280px", "$type": "other", "$description": "12-stage pipeline 6→3 col 분기" },
    "lg":    { "$value": "1024px", "$type": "other", "$description": "sidebar 248px / pipeline 2 col" },
    "md":    { "$value": "720px",  "$type": "other", "$description": "sidebar 슬라이드 토글 / 1 col" }
  }
}
```

분기점별 동작:

| ≥ 1280px | 1024–1279px | 720–1023px | < 720px |
|---|---|---|---|
| Desktop full layout — pipeline 6×2, agents 4×3, gates 5×1 | pipeline 3×4, agents 3×4, gates 3×2 | sidebar 248px, content 28px padding | sidebar 슬라이드, 모든 grid 1열 |

### 8-4. layout

```json
{
  "layout": {
    "sidebar.width":     { "$value": "290px", "$type": "dimension", "$description": "≥ 1024px 기본" },
    "sidebar.width.lg":  { "$value": "248px", "$type": "dimension", "$description": "1024–1279px" },
    "content.max-width": { "$value": "1480px","$type": "dimension", "$description": "본문 최대 폭" },
    "content.padding":   { "$value": "48px",  "$type": "dimension", "$description": "lateral padding ≥ 1024px" },
    "section-lead.max":  { "$value": "820px", "$type": "dimension", "$description": "lead 문단 가독성 폭" },
    "to-top.size":       { "$value": "50px",  "$type": "dimension" },
    "menu-toggle.size":  { "$value": "44px",  "$type": "dimension" }
  }
}
```

### 8-5. focus ring

본 페이지는 정보 제공용이며 폼 입력이 없으므로 focus ring 토큰을 별도 정의하지 않습니다. 키보드 접근성을 위해 브라우저 기본 outline 을 유지합니다 (CSS reset 으로 outline 제거하지 않음).

---

## 컴포넌트 → 토큰 매핑 (참조표)

| CSS 클래스 | 토큰 |
|---|---|
| `.neu-raised` | `surface.DEFAULT` + `shadow.raised` + `radius.lg` |
| `.neu-pressed` | `surface.DEFAULT` + `shadow.pressed` + `radius.lg` |
| `.text-em` / `.text-am` / `.text-pk` / `.text-cy` | `color.led.*` |
| `.text-grad-em` | `linear-gradient(135deg, led.emerald, led.emerald-2)` text fill |
| `.text-grad-mix` | `linear-gradient(135deg, led.emerald, led.amber 60%, led.pink 110%)` |
| `.btn-primary` | gradient(emerald→amber) + `shadow.raised` + `accent.emerald-inner` glow |
| `.led.led-em` / `.led-am` / `.led-pk` | LED dot + `pulseEm/Am/Pk` keyframes (delay 0/0.6/1.2s) |
| `.gate-tag.tg-block` | `pressed-sm` + `accent.pink-inner` + `text.led-pink` |
| `.gate-tag.tg-current` | gradient(emerald→amber) + emerald glow + `color.white` |
| `.pipeline-step.is-hitl::after` | inset `accent.amber-inner` |
| `.pipeline-step.is-final::after` | inset `accent.emerald-inner` |
| `.agent.tier-1::after` | inset `accent.emerald-inner` |
| `.agent.tier-2::after` | inset `accent.amber-inner` (약간 약한 14px) |
| `.agent.tier-3::after` | inset `accent.cyan-inner` (12px — 보조용) |
| `.bar-fill` (default) | gradient(emerald→amber) + emerald glow |
| `.bar-fill.high` | gradient(amber→pink) + amber glow |
| `.bar-fill.low` | gradient(cyan→emerald) + cyan glow |
| `.tier.t-block h3` | color `led.pink` |
| `.tier.t-major h3` | color `led.amber` |
| `.tier.t-minor h3` | color `led.cyan` |

---

## 컴포넌트 카탈로그

### Layout
- `.sidebar` — 좌측 고정 290px, 6개 nav-group, status footer
- `.menu-toggle` — 모바일 < 720px 햄버거
- `.content` — `margin-left: var(--sb-w)`, max-width 1480px

### Cards
- `.card.card-hover` — translateY(-4px) on hover
- `.principle` — 6 design principles
- `.gate` — 5-stage safeguard, 5가지 tg-* 변형
- `.pipeline-step` — 12 stages, is-hitl / is-final 변형
- `.agent` — 12 agents, tier-1 / tier-2 / tier-3 variant glow
- `.tier` — 4 compliance tiers (block/major/minor/info)
- `.journey-step` — 8 user journey steps with gradient num
- `.tl-item` — 4 roadmap milestones, pulse-card 변형 1개
- `.output` — Filing / Review docx, .r 변형은 amber accent
- `.list-card.law` / `.list-card.sec` — 법률/보안 항목 리스트
- **`.mode`** — Mode A/B/C 매트릭스 카드. m-a (emerald), m-b (amber), m-c (cyan) 의미적 구분. mode-letter는 모드 이니셜을 거대 글자로 표시 (44px extrabold + accent text-shadow)
- **`.legal-col.allowed` / `.legal-col.forbidden`** — 합법/위법 행위 2-col 비교. emerald ✓ / pink ✗ marker
- **`.flow-step.is-warn`** — 면책 동의서 6-step gate. amber inset glow로 강한 경고 강조 (Step 2~6)
- **`.country.ok` / `.partial` / `.blocked`** — 6 국가 셀프 출원 가능성 status 색 코딩
- **`.market-seg.s-a` / `.s-b` / `.s-c`** — 3-Tier 시장 세그먼트 카드. seg-revenue는 모드별 색상 (emerald/amber/cyan)
- **`.banner.warn`** — 강한 경고 배너. amber inset glow + 큰 아이콘 + 경고 카피

### Inputs / Buttons
- `.btn-neu` — 기본 (raised → translateY → pressed)
- `.btn-primary` — gradient emerald→amber + 글로

### Indicators / Charts
- `.led.led-em` / `.led-am` / `.led-pk` — 3색 펄스 LED
- `.bar-track` + `.bar-fill` — 가로 진행 바 (3 variant: default / high / low)
- `.stat-card` — Hero 6개 통계 (counter 애니메이션)
- `.status-pill` — 4xN 통계 pill

### Tags / Pills
- `.chip` — Hero meta 정보
- `.section-tag` — uppercase 섹션 태그
- `.gate-tag` — pressed-sm pill (block/major/minor/info/current)
- `.tl-tag` — roadmap pill (default / current)
- `.agent-badge` — Tier 1/2/3 + SVC pill

### Quote / Banner
- `.quote-banner` — Hero 인용문 + 마무리 인용문
- `.hero-quote` — Hero 보조 인용문

---

## 변경 이력

| 버전 | 날짜 | 변경 |
|---|---|---|
| v1.0 | 2026-05-06 | 최초 작성 — DTCG 호환 / Stitch ingest / Figma plugin 지원 / 8 카테고리 고정. AlphaForge / LLMOps Webpage와 visual language 공유, accent palette를 emerald(정상)+amber(HITL)+pink(BLOCKER) 3축으로 재배치 |
| v1.1 | 2026-05-06 | Legal Positioning(다섯 번째 가이드) 적용 — 7 신규 컴포넌트 추가: `.mode` (3-Mode A/B/C 매트릭스, m-a/m-b/m-c), `.legal-col.allowed/.forbidden` (합법/위법 행위 비교), `.flow-step.is-warn` (6-step 면책 동의서 게이트), `.country.ok/.partial/.blocked` (국가별 셀프 출원), `.market-seg.s-a/.s-b/.s-c` (3-Tier 시장 분석), `.ad-table .ok/.no` (광고 표현 합법/위법 line-through), `.banner.warn` (강한 경고 배너). 색 의미 확장: <b>m-a/s-a/.ok = emerald</b> (Mode A 권장 / 합법 진출), <b>m-b/s-b/is-warn = amber</b> (Mode B 면책 게이트 / HITL), <b>m-c/s-c = cyan</b> (Mode C 사내 R&amp;D · 보조 정보 색상의 의미적 승격), <b>.blocked/.no = pink</b> (셀프 출원 불가 / 위법 표현). |

---

## 라이선스

본 디자인 시스템은 WDLAB Internal — 다른 WDLAB 프로젝트에서는 자유 재사용. 외부 사용은 별도 협의.

---

May 06, 2026 | Brian Lee | WDLAB
