# Screen Collect

## Overview

Social Application, which can **collect** all participant screen in real time.


## Pre-requisite

- Public application server for Node.js

    - I would describe followings as you use IBM Cloud for this environment.


## Pre-requisite for IBM Cloud user

- Node.js runtime


## Install

- Download source from github.com

    - https://github.com/dotnsf/screen_collect.git

- Edit settings.js with following information:

    - exports.admin_username : username for Basic Authenticate to access /view and /admin

    - exports.admin_password : password for Basic Authenticate to access /view and /admin

    - exports.defaultroom : default room name when not specified

- Deploy application into IBM Cloud


## How to use

- First, administrator need to access to /view so that it can handle all client.

    - If you want to specify room name, then access to /view?room=XXXX

- Then user may access to / with their smartphone, and input his/her name.

    - If you want to use room name, then access to /?room=XXXX

- When user draw their doodle in their smartphone, all doodles would be shown in /view screen.


## Copyright

2020 [K.Kimura @ Juge.Me](https://github.com/dotnsf) all rights reserved.
