[net setup](environment/setup/net.md ':include :type=markdown')

## Global.asax

One extra step: in general a REST API should be state-less, meaning it doesn't maintain control of users on a session. As this app will show data per user we need to identify who is making the calls, let's enable session for `/api/` endpoints only. The following code should copied to the the existing `Global.asax` code file:

[Global.asax](_snippets/viewhubmodels/net/Global.asax ':include :type=code csharp')

Project is ready!

Next: [Authorize](oauth/3legged/)