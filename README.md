# ITsec_SQLinjection
惡意代碼注入資料庫的攻擊

透過修改從 Web app 送到 DB 的 SQL 敘述，即稱為 SQL 注入，或稱為 SQLi。

# Detect this Bug

* Length, 可疑請求的內容長度

* Latency, 回應產生延遲時間 (因為繞過同源政策，利用跨域技術。)
