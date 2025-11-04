<template>
    <footer>
        <nav>
            <p class="image"><a href="#header"><img src="/logo-sem-fundo.png" alt=""></a></p>
            <ul class="temos">
                <li>Series</li>
                <li>Atores</li>
                <li>Trailers</li>
            </ul>
            <ul class="social">
                <li><span class="mdi mdi-github"></span></li>
                <li><span class="mdi mdi-instagram"></span></li>
            </ul>
            <p>Alguns direitos reservados &copy; 2025</p>
        </nav>
    </footer>
</template>
<style scoped>
    nav{
        background-color: #6699D4;
        color: white;
        padding: 1rem 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin-top: 2rem;
    }
    p{
        text-align: center;
    }
    ul{
        display: flex;
        align-items: center;
        margin: 0;
        padding: 0;
        gap: 3rem;
        list-style: none;
    }
    ul.social{
        list-style: none;
        font-size: 2rem;
        gap: 1.5rem;
    }
    img{
        margin: 0;
        margin: 0 auto;
        width: 120px;
    }
    p:last-child{
        font-size: 0.7rem;
    }
</style>