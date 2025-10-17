<template>
    <section class="fundo">
        <div class="escuro">
            <div class="search">
                <input type="text" placeholder="Pesquise por series dos anos 2000..." />
                <span class="mdi mdi-magnify"></span>
            </div>
        </div>
    </section>
</template>

<style scoped>
.fundo {
    background: url('/public/img/banner.jpg');
    height: 80vh;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
}
.escuro {
    background-color: rgba(0, 0, 0, 0.6);
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.search {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
}

.search input {
    font-size: 1.6rem;
    padding: 1rem 2rem;
    width: 100%;
    padding-right: 40px;
    border-radius: 5px;
    border: 1px solid #ccc;
    border-radius: 10px;
}

.search input:focus {
    outline: none;
    border-color: #777;
}

.search .mdi-magnify {
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
    font-size: 2rem;
    color: #aaa;
}
</style>
