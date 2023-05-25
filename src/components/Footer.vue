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
                <div class="line"></div>
                <div class="col2 col">
                    <label>About</label>
                    <span>Contact</span>
                    <span>Service</span>
                    <span>Team</span>
                </div>
                <div class="line"></div>
                <div class="col3 col">
                    <label>Services</label>
                    <span>Event</span>
                    <span>News</span>
                    <span>Award</span>
                </div>
                <div class="line"></div>
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
    position: static;
    bottom: 0;
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
.line {
    display: none;
    width: 100px;
    border: 1px solid grey;
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

@media (max-width: 425px) {
    .line {
        display: block;
    }

    .header {
        flex-direction: column;
        padding: 1rem 0;
        width: 100%;
        gap: 1.5rem;
    }
    .footer {
        width: 425px;
        height: auto;
    }
    .col {
        margin: 0.5rem 0;
        justify-content: center;
        align-items: center;
    }
}
</style>