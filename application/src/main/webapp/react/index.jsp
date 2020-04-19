<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="Description" content="
                    A web application dedicated to the analysis of a development project.
                    Simply upload your project directory and receive statistical project information.
                    Created by Shane Creedon.
                    Length: 1 page">

        <title> Code Wars - An adversarial learning tool </title>
        <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
        <link rel="icon" type="image/png"  href="${pageContext.request.contextPath}/resources/assets/icon/favicon.ico">
    </head>

    <body>
        <%-- React Hook-in for SPA --%>
        <div id="root" style="width: 100%; height:100%"></div>

        <c:choose>
            <c:when test="${profile != 'dev'}">
                <script type="text/javascript" src="<c:url value="/react/dist/bundle.js"/>"></script>
            </c:when>
            <c:otherwise>
                <script type="text/javascript" src="http://localhost:3000/dist/bundle.js"></script>
            </c:otherwise>
        </c:choose>

    </body>
</html>
