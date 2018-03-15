# Tools (Go)

Download and install the [Go distribution](https://golang.org/doc/install) to run your code. 

Make sure you [$GOPATH](https://github.com/golang/go/wiki/GOPATH) environment variable is set, this is required for first time usage. 
You can use a `/go/` folder under your user folder in case OSX and Linux OS:

```bash
// MacOS & Linux
export GOPATH=$HOME/go
```

In case of Windows, we recommend setting up the `GOPATH` into a simple location like `C:\GOPROJECTS`:

```cmd
// Windows
set GOPATH=C:\GOPROJECTS
```

Now we need an IDE to write the code. There are many options, this tutorial will use [Visual Studio Code](https://code.visualstudio.com/).

> For this tutorial, use all default install options.

Next, install Go for Visual Code package which once installed gives support to GoLang.
    - Go to Visual Code extension manager (left side, bottom icon)
    - Type `go` and select `Go` plugin made by ***lukehoben***.

![](_media/go/install_go_extension.gif) 

Next: [Authentication](oauth/)