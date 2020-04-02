# Screen Collect

## Overview

Social Application, which can **collect** all participant screen in real time.


## Pre-requisite

- Public application server for Node.js

    - I would describe followings as you use IBM Cloud for this environment.

- PC Web Browser

    - Mobile Web Browser is not supported.(Not working)


## Pre-requisite for IBM Cloud user

- Node.js runtime


## Install

- Download source from github.com

    - https://github.com/dotnsf/screen_collect.git

- Edit settings.js with following information:

    - exports.admin_username : username for Basic Authenticate to access /view

    - exports.admin_password : password for Basic Authenticate to access /view

    - exports.intervalms : interval timing to take screen-shot image by milliseconds.

    - exports.defaultroom : default room name when not specified

- Deploy application into IBM Cloud


## Demo URL

### For administrator

https://screen-collect.mybluemix.net/view

- Basic Certification ID: admin

- Basic Certification Password: password

### For user

https://screen-collect.mybluemix.net/


## How to use

- First, administrator need to access to /view so that it can handle all client.

    - If you want to use specific(not-public) room with name 'XXXX', then access to /view?room=XXXX

- Then user may access to / with their smartphone, and input his/her name.

    - If you specified specific room name, then user would access to /?room=XXXX, or user may specifiy room name there.

- User might be asked to share their screen. User can choose which application/window/full screen to share. Then click "Share" button.

- Administrator can see user's selected screen image by each 5000 milliseconds by default.

- User can stop sharing when click "Stop sharing" button.


## Copyright

2020 [K.Kimura @ Juge.Me](https://github.com/dotnsf) all rights reserved.
