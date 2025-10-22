<script setup>
    import { RouterLink } from 'vue-router';
</script>
<template>
    <footer>
        <nav>
            <div class="dev">
                <h3>Desenvolvido por:</h3>
                <p>Lucas Fontini Luz</p>
                <p>Maria Carolina Silveira</p>
            </div>
            <ul class="social">
                <li class="instagram">
                    <span class="mdi mdi-instagram"></span>
                </li>
                <li class="github">
                    <a href="https://github.com/LucasFontini1/Tela00s.git" target="_blank">
                        <span class="mdi mdi-github"></span>
                    </a>
                </li>
            </ul>
            <ul class="pages">
                <li class="voltar">
                    <a href="#header">Voltar Ao topo</a>
                </li>
                <li class="home">
                    <RouterLink to="/">Início</RouterLink>
                </li>
                <li class="series">
                    <RouterLink to="/series">Séries</RouterLink>
                </li>
            </ul>
        </nav>
    </footer>
</template>
<style scoped>
nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    background-color: #1B5EB8;
    color: white;
    margin-top: 2rem;
}
a{
    color: white;
}
.dev h3{
    margin-bottom: 0.5rem;
}
.dev{
    width: 25%;
}
.social{
    display: flex;
    gap: 1rem;
    list-style: none;
    justify-content: center;
    width: 50%;
}
.social li{
    font-size: 2.5rem;
    cursor: pointer;
}
.social li.instagram:hover{
    color: #E1306C;
    transition: 0.3s ease-in;
}
.social li.github:hover a{
    color: #333;
    transition: 0.3s ease-in;
}
ul.pages li{
    margin-bottom: 0.5rem;
    cursor: pointer;
}
ul.pages{
    width: 25%;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
}
ul.pages li{
    padding: 0.5rem 1rem;
}
ul.pages li:hover{
    background-color: #0F3363;
    transition: 0.3s ease-in;
    border-radius: 10px;
}

</style>