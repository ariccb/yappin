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
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-account-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title> {{userNames[0]}}
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
                    append-outer-icon="send"
                    @click:append-outer="sendMessage()"
                    @keypress.enter="sendMessage()" />
            </v-card-text>
        </v-card>
    </v-footer>
    <v-main>
        <goboard>
        </goboard>
        <v-layout
            fill-height
            column
            style="min-height: 0px;">
            <div
                id="chatbox"
                style="height: calc(100vh - 94px); overflow-y: auto;">
                <v-card
                    tile
                    v-for="(chat, index) in chats"
                    :key="index">
                    <v-card-subtitle>
                        {{chat.user}}
                    </v-card-subtitle>
                    <v-card-text>
                        {{chat.message}}
                    </v-card-text>
                </v-card>
            </div>
        </v-layout>
    </v-main>
</v-app>
</template>

<script>
import goboard from './goboard'
import axios from 'axios'
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length)
}
export default {
    name: 'App',
    components:{goboard},
    data() {
        return {
            userNames: ['acrossonbouwers', 'DanTheMan'],
            userNameEntry: '',
            goStatus: [],
            chats: [{
                    user: 'Aric',
                    message: 'Ok this is something, you happy?'
                },
                {
                    user: 'Daniel',
                    message: 'What is this place? I\'m kinda freaked out man. Let`s go, jogger'
                },
            ],
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
            this.userNames.unshift(this.userNameEntry)
        }
        //   addUser() {
        //       this.username.push(this)
        //   }
    },
    computed: {
        censorchats() {
            let k
            let i //this indexes the word we are on
            for (k = 0; k < this.chats.length; k++) {
                for (let l = 0; l < this.badWords2.length; l++) {
                    for (i = 0; i < this.chats[k].length; i++) {
                        let badWord = ''
                        let jogger = this.badWords2[l].word
                        if (this.chats[k][i] == this.badWords2[l].word[0]) {
                            badWord = this.badWords2[l].word[0]
                            for (let j = 0; j < this.badWords2[l].word.length - 1; j++) {
                                let letter = this.chats[k][i + j + 1]
                                if (letter == jogger[j + 1]) {
                                    badWord += this.chats[k][i + j + 1]
                                    console.log(badWord)
                                } else {
                                    break
                                }
                            }
                        }
                        if (badWord == this.badWords2[l].word) {
                            for (let s = 0; s < this.badWords2[l].stars; s++) {
                                this.chats[k] = this.chats[k].replaceAt(i + s, '*')
                            }
                        }
                    }
                }
            }
            return this.chats
        }
    },
    mounted ()
    { axios.get('http://localhost:3000/').then((res)=>{
        console.log(res)
    })}
      
    }
</script>

<style>
html {
    overflow: hidden !important;
}
</style>
