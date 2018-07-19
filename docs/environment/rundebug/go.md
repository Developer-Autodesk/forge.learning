# Running & Debugging (Go)

To start the server, just open the Visual Studio code integrated terminal by going to menu **View** > **Integrated Terminal**, 
which should open on the root of your project, then run:

```bash
    go run main.go
```

Open your browser and go to `http://localhost:3000` to check the app.

## Debug

For Visual Code, install [Delve](https://github.com/derekparker/delve), the golang debugger, by typing in on the **Integrated Terminal** (under menu **View**):

```bash
go get -u github.com/derekparker/delve/cmd/dlv
```

Once `delve` is installed, you can either press F5 or go to menu **Debug** >> **Start debugging**. 

!> For debug, make sure the `main.go` file is open on Visual Code before pessing **F5**, otherwise you may see an error (see [Troubleshooting](#troubleshooting))

You will now see a launch.json file created for your workspace, which will contain the configurations for debugging. By default, there would be a single configuration as below:

```javascript
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
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

## Troubleshooting

If by any chance, you receive an error like `Can not debug non-main package`, don't despair, just open the `main.go` from the route of your project and try again. 

    NOTE: This is caused by `"program": "${fileDirname}"` line in configuration file, 
    based on which it will try to start your app using the location of your opened file, 
    so if you start debugging your app by selecting non-main file, it will not know where 
    to start.
    This makes more sense when you will have apps generating several 
    executables (g.e. daemon and client).

If by any chance, you receive an error like `could not launch process: exec "lldb-server"`, then for sure you are developing on OSX and you are missing the `command line developer tools`. To fix this, just follow these steps:
    1. Open a new Terminal (do not use Visual Code Integrated Terminal)
    2. Run xcode-select --install
    3. When prompted, click on Install
![](_media/go/osx_setup_tools.png) 


## Advanced settings

If you are interested in a terminal only debugging (hardcore debugging), have a look at following tutorials:

- the [way of GDB](https://golang.org/doc/gdb) - for debbuging golang applications using GDB;
- the [way of LLDB](http://blog.ralch.com/tutorial/golang-debug-with-lldb/) - for debbuging golang applications using LLDB;


For those that don't like setup anything, there is [Goland](https://www.jetbrains.com/go/) that includes all needed visual tools and should be familiar to those using JetBrains products.



Next: [Viewer extension](tutorials/extensions)