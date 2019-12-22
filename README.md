# ITsec_SQLinjection
惡意代碼注入資料庫的攻擊

透過修改從 Web app 送到 DB 的 SQL 敘述，即稱為 SQL 注入，或稱為 SQLi。

# Detect this Bug

* Length, 可疑請求的內容長度

* Latency, 回應產生延遲時間 (因為繞過同源政策，利用跨域技術。)

# SQL Injection

當跨域資源被視為駭客的鎖定目標後，...

1. 執行命令

2. 取出資料（從資料庫）
