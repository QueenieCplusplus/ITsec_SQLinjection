# ITsec_SQLinjection
惡意代碼注入資料庫的攻擊

透過修改從 Web app 送到 DB 的 SQL 敘述，即稱為 SQL 注入，或稱為 SQLi。

# Detect this Bug

* Length, 可疑請求的內容長度

* Latency, 回應產生延遲時間 (因為繞過同源政策，利用跨域技術。)

# SQL Injection

當跨域資源被視為駭客的鎖定目標後，...

1. 向伺服器的系統執行命令

2. 取出資料（從資料庫）

以上，作業系統命令的執行取決於資料庫的配置檔案，其中有關使用者和權限階層相關的設定。駭客利用呼叫相關的預存程式方法呼叫，如 sp_configure() 啟用原以為只有 sysadmin 才有權利啟用的預存程序，接著駭客利用 ping tool 查驗 localhost 需要多少時間，代表是否具備可以夾帶執行其他作業系統指令操作的時機！此時，便呼叫 xp_cmdshell()。



