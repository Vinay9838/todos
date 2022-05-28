# Todos

---

>Please execute following command in sequence for seamless configuration

### Activate virtual environment

````shell
virtualenv -p python3 /home/todos/todos-env
source /home/todos/todos-env/bin/activate
````

### Application dependencies
```shell
pip install -r requirements.txt
```

### Application setup

```shell
./manage.py migrate
```
---
Once run the server you will be able to see the home page with multiple options to record your message.

![Home Page](https://github.com/Vinay9838/todos/blob/master/static/assets/images/todoPage.png?raw=true)

### Record video message

Click on the Video tab and starting recording your message then click the create button.

![Video Record](https://github.com/Vinay9838/todos/blob/master/static/assets/images/videoTodo.png?raw=true)

### Record audio message

Click on the Audio tab and starting recording your message then click the create button.

![Video Record](https://github.com/Vinay9838/todos/blob/master/static/assets/images/audioTodo.png?raw=true)

### Text message

Click on the Text tab and starting typing your message then click the create button.

![Video Record](https://github.com/Vinay9838/todos/blob/master/static/assets/images/textTodo.png?raw=true)

### Active and History

On the left side you can see your Active and the History of Todos

### History

![Video Record](https://github.com/Vinay9838/todos/blob/master/static/assets/images/history.png?raw=true)

### See your video message

![Video Record](https://github.com/Vinay9838/todos/blob/master/static/assets/images/videoRecorded.png?raw=true)

> Note: Video and Audio recorder is managed by <a href="https://videojs.com/" target="_blank"> videojs </a> library

