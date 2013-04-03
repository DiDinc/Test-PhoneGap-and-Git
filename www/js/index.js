/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var previousLocation = '';
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        document.addEventListener("online", onAppIsOnline, false);
        document.addEventListener("offline", onAppIsOffline, false);
        document.getElementById("retryConnection_btn").addEventListener("click",retryConnectionHandler,false)
        if (navigator.connection.type == 'none') {
            setAppState(false);
        } else {
            //document.location.href = 'http://www.youngevity.reurgency.com/youngevity_dev1_repapp';
            window.open('http://www.youngevity.reurgency.com/youngevity_dev1_repapp', '-self', null);
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        console.log('Received Event: ' + id);
    }
};


//Call when app comes online
var onAppIsOnline = function () {
    app.receivedEvent('online');
    if (document.getElementById("offline_div").style.display == 'block') {
        if (previousLocation != '') {
            document.location.href = previousLocation;
        } else {
            document.location.href = 'http://web1.youngevity.reurgency.net/youngevity_dev1_repapp';
        }
    }
},
//Call When app goes offline
onAppIsOffline = function () {
    app.receivedEvent('offline');
    setAppState(false);
    previousLocation = document.location.href;
},
//Set app state to show/hide offline msg
setAppState = function (isOnline) {
    if (isOnline) {
        document.getElementById("mainApp_div").style.display = "block";
        document.getElementById("offline_div").style.display = "none";
    } else {
        document.getElementById("mainApp_div").style.display = "none";
        document.getElementById("offline_div").style.display = "block";  
    }
},
//Called from offline mode div to re-check connection
retryConnectionHandler = function () {
    if (navigator.connection.type != 'none') {
        setAppState(true);
    }
}