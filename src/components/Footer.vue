<script>
export default {
    name: 'Footer',
    data() {
        return {

        }
    },
    props: {
        item: Object
    },
    methods: {
        async pushCardPage(id) {
            this.$router.push({ name: 'cardpage', params: { id: id } })
        }
    }
}
</script>

<template>
    <div class="footer">
        <div class="footer-container">
            <div class="header">
                <div class="col1 col">
                    <label>Discover</label>
                    <span>Get Started</span>
                    <span>Online retails</span>
                    <span>Services</span>
                </div>
                <div class="col2 col">
                    <label>About</label>
                    <span>Contact</span>
                    <span>Service</span>
                    <span>Team</span>
                </div>
                <div class="col3 col">
                    <label>Services</label>
                    <span>Event</span>
                    <span>News</span>
                    <span>Award</span>
                </div>
                <div class="col4 col">
                    <label>Help</label>
                    <span>FAQ</span>
                    <span>Support</span>
                    <span>Knowledge Base</span>
                </div>
            </div>
            <div class="divider">

            </div>
            <div class="bottom">
                <label id="bottom-txt">My Recipe @All Rights Reserved</label>
            </div>
        </div>
    </div>
</template>

<style scoped>
.footer {
    width: 100%;
    height: 12rem;
    box-shadow: var(--box-shadow2);
    display: flex;
    flex-direction: column;
    background: black;
    justify-content: center;
    align-items: center;
}

span {
    font-size: 0.8rem;
    font-weight: 400;
    cursor: pointer;

    color: rgb(255, 255, 255);
}

label {
    font-weight: 500;

    color: rgb(255, 255, 255);
}

.col {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

#bottom-txt {
    font-size: 1rem;

    color: rgb(255, 255, 255);
    margin-top: 2rem;
}

.footer-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 85%;
    padding: 1rem;

    gap: 0.5rem;
}

.divider {
    border: 1px solid rgb(255, 255, 255);
    height: 0.2rem;
    width: 50%;

}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    width: 100%;
}
</style>