new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: [],
        gameEndedStatus: '',
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
            this.gameEndedStatus = '';
        },
        attack: function () {
            var min_damage_monster = 3;
            var max_damage_monster = 10;

            this.playerAttacks (min_damage_monster, max_damage_monster);
            
            this.monsterAttacks();

            this.checkWin();
        },
        specialAttack: function () {
            var min_sp_attack = 10;
            var max_sp_attack = 20;

            this.playerAttacks (min_sp_attack, max_sp_attack);

            this.monsterAttacks();

            this.checkWin();
        },
        heal: function () {
            var healed_value;
            var oldHealth = this.playerHealth;
            this.playerHealth += 10;
            if(this.playerHealth >= 100){
                this.playerHealth = 100;
            }
            healed_value = this.playerHealth - oldHealth;
            this.turns.unshift({
                is_player: true,
                text: 'Player healed by '+ healed_value,
            });

            this.monsterAttacks();
        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        playerAttacks: function(min,max) {
            var damage = this.calculateDamage(min, max);
            this.monsterHealth -= damage;
            this.updateTurns(damage);
        },
        monsterAttacks: function(){
            var min_damage_player = 5;
            var max_damage_player = 12;

            var damage = this.calculateDamage(min_damage_player, max_damage_player);

            this.playerHealth -= damage;

            this.updateTurns(damage, false);
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        updateTurns: function(damage, is_player = true) {
            var text;
            var strength = '';
            if(damage >= 10){
                strength = ' hard';
            }
            if(is_player == true){
                text = 'Player hits Monster'+strength+' with ' + damage + ' damage';
            }else{
                text = 'Monster hits Player'+strength+' with ' + damage + ' damage';
            }
            this.turns.unshift({
                is_player: is_player,
                text: text,
            });
        },
        checkWin: function() {
            var text = '';

            if(this.monsterHealth <= 0 && this.playerHealth <= 0){
                this.monsterHealth = 0;
                this.playerHealth = 0;
                text = 'Wow its a draw! You are the REAL winner!!! ';
            }else if(this.monsterHealth <= 0) {
                this.monsterHealth = 0;
                text = 'You won! New Game?';
            }else if(this.playerHealth <= 0) {
                this.playerHealth = 0;
                text = 'You lose! New Game?';
            }

            if(text != '') {
                this.gameEndedStatus = text;
                this.gameIsRunning = false;
            }
        }
    }
});