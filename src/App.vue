<template>
<v-app>
    <v-app-bar
        color="cyan lighten-3"
        dark>
        <v-app-bar-nav-icon
            @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>Yappin Chats</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        dark>
        <v-container>

            <v-list
                dense
                nav
                class="py-0">
                <v-list-item
                    v-for="(myUsername, index) in userNames"
                    :key="index"
                    @click:>
                    <v-list-item-icon>
                        <v-icon>mdi-account-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title> {{myUsername}}
                    </v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-account-convert-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Change Username
                    </v-list-item-title>
                </v-list-item>
                <v-card
                    outlined
                    dark>
                    <v-card-text>
                        <v-text-field
                            :rules="rules"
                            placeholder="Enter New Username"
                            hint="Make sure it's catchy"
                            dense
                            clearable
                            v-model="userNameEntry"
                            append-outer-icon="send"
                            @click:append-outer="newUserName()"
                            @keypress.enter="newUserName()"
                            padless>
                        </v-text-field>
                    </v-card-text>
                </v-card>
            </v-list>
        </v-container>
    </v-navigation-drawer>
    <v-footer
        app
        tile
        padless
        dark>
        <v-card
            dark
            width="100%"
            tile
            flat>
            <v-card-text>
                <v-text-field
                    v-model="text"
                    placeholder="Type your chats here"
                    append-outer-icon="send"
                    @click:append-outer="sendMessage()"
                    @keypress.enter="sendMessage()" />
            </v-card-text>
        </v-card>
    </v-footer>
    <v-main>
        <v-col
            fill-height
            column
            style="min-height: 0px;">
            <div
                id="chatbox"
                style="height: calc(100vh - 183px); overflow-y: auto;">
                <v-card
                    tile
                    v-for="(chat, index) in censorchats"
                    :key="index">
                    <v-card-text>
                        <b>{{chat.user}}</b> : {{chat.message}}
                    </v-card-text>
                </v-card>
            </div>
        </v-col>
    </v-main>
</v-app>
</template>

<script>
import axios from 'axios'
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length)
}
export default {
    name: 'App',
    data() {
        return {
            userNames: [],
            userNameEntry: '',
            // currentUser: 'First',
            chats: [],
            text: '',
            // badWords: ['two genders', 'jogger'],
            badWords2: [{
                    word: 'pro-trudeau',
                    stars: 5
                },
                {
                    word: 'liberal',
                    stars: 2
                },
            ],
            drawer: false,
            rules: [
                value => {
                    const pattern = /^\S+$/g;
                    return pattern.test(value) || 'Username cannot contain spaces'
                },
            ]
        }
    },
    methods: {
        sendMessage() {
            let chat = {
                user: this.userNames[0],
                message: this.text
            }
            this.chats.push(chat)
            this.text = ''
        },
        newUserName() {
            if (confirm("Are you sure you want to change your username?")) {
                this.userNames.unshift(this.userNameEntry)
            } else {
                this.userNameEntry = ''
            }
        }
        // changeUserName()
    },
    computed: {
        censorchats() {
            let k
            let i //this indexes the word we are on
            let chats = this.chats
            for (k = 0; k < chats.length; k++) {
                for (let l = 0; l < this.badWords2.length; l++) {
                    for (i = 0; i < chats[k].message.length; i++) {
                        let badWord = ''
                        let jogger = this.badWords2[l].word
                        if (chats[k].message[i] == this.badWords2[l].word[0]) {
                            badWord = this.badWords2[l].word[0]
                            for (let j = 0; j < this.badWords2[l].word.length - 1; j++) {
                                let letter = chats[k].message[i + j + 1]
                                if (letter == jogger[j + 1]) {
                                    badWord += chats[k].message[i + j + 1]
                                    console.log(badWord)
                                } else {
                                    break
                                }
                            }
                        }
                        if (badWord == this.badWords2[l].word) {
                            for (let s = 0; s < this.badWords2[l].stars; s++) {
                                chats[k].message = chats[k].message.replaceAt(i + s, '*')
                            }
                        }
                    }
                }
            }
            return chats
        }
    },
    //   mounted ()
    //   {
    // let any = '<div class="v-card v-sheet theme--light rounded-0"><div class="v-card__text"> I am the first chat </div></div>'
    // let el = document.getElementById('chatbox')
    // el.innerHTML += any
    // axios.get('http://localhost:3000')
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   }
};
</script>

<style>
html {
    overflow: hidden !important;
}
</style>
