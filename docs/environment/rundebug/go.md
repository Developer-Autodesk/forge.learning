# Running & Debugging (Go)

Before running the server, we must make sure that we have all dependencies on our mashine, and this can be assured by
going to the root of your project and running:

```bash
    go get
 ```


Next, to run the server, run from the same location:

```bash
    go run main.go
```

Open your browser and go to `http://localhost:3000` to check the app.


Debugging Go code can vary in difficulty, depending what IDE you are using, if using any IDE at all. 
Since in this tutorial we are using Visual Studio Code, the following steps are needed to setup debugging:

1. Install Go for VSCode package which once installed gives support to GoLang.
    - Open `Command Palette ...` by presing Ctrl + Shift + P.
    - Type `ext install` & select `Install Extension`.
    - Type `go` and select `Go` plugin made by ***lukehoben***.

2. Install [Delve](https://github.com/derekparker/delve) the golang debugger by typing in terminal:
    ```bash
        go get -u github.com/derekparker/delve/cmd/dlv
    ```

Once `delve `is installed, you can either press F5 or go to the Code debug viewlet and select the configuration gear.

You will now see a launch.json file created for your workspace, which will contain the configurations for debugging. By default, there would be a single configuration as below:
```javascript
{
	    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch",
            "type": "go",
            "request": "launch",
            "mode": "debug",
            "remotePath": "",
            "port": 2345,
            "host": "127.0.0.1",
            "program": "${fileDirname}",
            "env": {},
            "args": [],
            "showLog": true
        }
    ]
}
```

There is nothing to be changed here, so save it and you are all set.

Setup breakpoints and in `Code debug viewlet` (F5) press the green `Start Debugging` button to start debugging.

Go to menu **Debug** and select **Start debugging**. The "Debug Console" tab should appear on the bottom, as shown below:

![](_media/go/vs_code_debug.png) 

If by any chance, you receive an error like `Can not debug non-main package`, don't despair, just open the `main.go` from the route of your project and try again. 

    NOTE: This is caused by `"program": "${fileDirname}"` line in configuration file, 
    based on which it will try to start your app using the location of your opened file, 
    so if you start debugging your app by selecting non-main file, it will not know where 
    to start.
    This makes more sense when you will have apps generating several 
    executables (g.e. daemon and client).



If you are interested in a terminal only debugging (hardcore debugging), have a look at following tutorials:

- the [way of GDB](https://golang.org/doc/gdb) - for debbuging golang applications using GDB;
- the [way of LLDB](http://blog.ralch.com/tutorial/golang-debug-with-lldb/) - for debbuging golang applications using LLDB;


For those that don't like setup anything, there is [Goland](https://www.jetbrains.com/go/) that includes all needed visual tools and should be familiar to those using JetBrains products.



Next: [Deployment](deployment/)