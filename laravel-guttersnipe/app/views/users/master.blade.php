<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<div style="navbar">
@if(loggedin)
    User ID:
    @if (notAdmin)
        ID Expires:
        Renew UserID
    @endif
@else
    Login
    Sign Up
@endif

</div>
</body>
</html>