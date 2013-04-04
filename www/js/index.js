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
var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        // This is an event handler function, which means the scope is the event.
        // So, we must explicitly called `app.report()` instead of `this.report()`.
        app.report('deviceready');
        document.addEventListener("online", this.onAppIsOnline, false);
        document.addEventListener("offline", this.onAppIsOffline, false);
        
        if (navigator.connection.type == 'none') {
            app.report('OFFLINE');
        } else {
            app.report('ONLINE');
            document.location.href = 'http://www.youngevity.reurgency.com/youngevity_dev1_repapp';
            //window.open('http://www.youngevity.reurgency.com/youngevity_dev1_repapp', '-self', null);
        }
    },
    report: function(id) {
        // Report the event in the console
        console.log("Report: " + id);
        
        // Toggle the state from "pending" to "complete" for the reported ID.
        // Accomplished by adding .hide to the pending element and removing
        // .hide from the complete element.
        if (id == 'deviceready') {
            document.querySelector('#' + id + ' .pending').className += ' hide';
            var completeElem = document.querySelector('#' + id + ' .complete');
            completeElem.className = completeElem.className.split('hide').join('');
        } else {
            navigator.notification.alert(
                "Report: " + id,  // message
                this.alertDismissed,   // callback
                'Report',         // title
                'Ok'            // buttonName
            );
        }
    },
    alertDismissed: function() {
        // do something
    },
    onAppIsOnline: function () {
        app.report('online');
        //document.getElementById("offline_div").style.display == 'none';
        //if (previousLocation != '') {
        //    document.location.href = previousLocation;
        //} else {
        //    document.location.href = 'http://www.youngevity.reurgency.com/youngevity_dev1_repapp';
        //}
    },
    //Call When app goes offline
    onAppIsOffline: function () {
        app.report('offline');
        //setAppState(false);
        //previousLocation = document.location.href;
    }
};
