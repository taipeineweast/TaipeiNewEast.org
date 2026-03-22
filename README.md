# 台北新東扶輪社網站 — AI 更新操作指南

## 網站架構

```
website/
├── index.html          ← 語言選擇入口頁
├── zh/index.html       ← 繁體中文主頁
├── en/index.html       ← English
├── ja/index.html       ← 日本語
├── assets/             ← CSS、JS、圖片
├── data/news.json      ← 最新消息資料（AI 主要更新此檔案）
└── README.md           ← 本文件
```

## 透過 Discord 更新網站

### 更新流程

1. 在 Discord 頻道中，用中文告知 AI Agent 要更新的內容
2. AI Agent 會：
   - 修改對應的 HTML 或 JSON 檔案
   - 自動將中文翻譯成英文和日文
   - 提交 Git commit 並 push 到 GitHub
   - GitHub Pages 自動部署（約 1-2 分鐘生效）

### 可更新的內容與對應檔案

| 更新項目 | 對應檔案 | 說明 |
|---------|---------|------|
| 最新消息 | `data/news.json` | 新增/修改/刪除消息項目 |
| 年度社長與幹部 | `zh/index.html`, `en/index.html`, `ja/index.html` | 修改 About 區塊中的社長資訊 |
| 服務成果 | 三語 `index.html` | 新增服務成果卡片 |
| 活動時程 | 直接更新 Google Calendar | 網站自動同步，無需改程式 |

### Discord 指令範例

```
@AI更新 請更新最新消息：
- 日期：2026-04-15
- 標題：春季聯誼活動
- 內容：本社將於四月舉辦春季聯誼高爾夫球活動，歡迎社友攜眷參加。
```

```
@AI更新 新年度社長更新：
- 2026-2027 第 40 屆社長：林孟文 PE Nick
- 社長當選人：（待定）
```

## news.json 格式說明

```json
{
  "last_updated": "2026-03-22",
  "news": [
    {
      "date": "2026-04-15",
      "title_zh": "中文標題",
      "title_en": "English Title",
      "title_ja": "日本語タイトル",
      "summary_zh": "中文摘要一行",
      "summary_en": "English summary in one line",
      "summary_ja": "日本語の概要一行"
    }
  ]
}
```

- 最多顯示 3 則最新消息
- `date` 可以是日期或描述性文字
- AI 翻譯時以中文為主，自動生成英文和日文

## 年度交接更新清單

每年七月新年度開始時，需更新：

1. **社長與幹部資訊**（三語 HTML 的 About 區塊）
2. **年度主題**（Hero 區塊的年度主題文字）
3. **國際扶輪社長**（Footer 區域）
4. **地區總監**（About 區塊）
5. **最新消息**（news.json）

## 部署資訊

- **網域**：taipeineweast.org
- **DNS 管理**：Squarespace
- **託管**：GitHub Pages
- **自動部署**：push 到 main branch 即自動更新

## Google Calendar

- 公開網址：`https://calendar.google.com/calendar/embed?src=5f232tpfqo3a7l13ur4d82mit8%40group.calendar.google.com&ctz=Asia%2FTaipei`
- iCal 訂閱：`https://calendar.google.com/calendar/ical/5f232tpfqo3a7l13ur4d82mit8%40group.calendar.google.com/public/basic.ics`
- 更新行事曆：直接在 Google Calendar 中操作即可，網站會自動同步
