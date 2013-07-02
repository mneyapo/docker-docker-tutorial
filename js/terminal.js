// Generated by CoffeeScript 1.3.3

/*
  Please note the javascript is being fully generated from coffeescript. So make your changes in the .coffee file.
  Thatcher Peskens
*/


(function() {

  (this.myTerminal = function() {
    var bash, docker, dockerCommands, docker_cmd, pull, pull_no_results, pull_tutorial, pull_ubuntu, run_cmd, run_learn_tutorial, run_notfound, run_switches, run_ubuntu, search, search_no_results, search_tutorial, search_ubuntu, util_slow_lines, version, wait;
    this.basesettings = {
      prompt: 'you@tutorial:~$ ',
      greetings: "Welcome to the interactive Docker tutorial. Enter 'docker' to begin"
    };
    /*
        Callback definitions. These can be overridden by functions anywhere else
    */

    this.preventDefaultCallback = false;
    this.immediateCallback = function(command) {
      console.debug("immediate callback from " + command);
    };
    this.finishedCallback = function(command) {
      console.debug("finished callback from " + command);
    };
    this.intermediateResults = function(string) {
      console.debug("sent " + string);
    };
    /*
        Base interpreter
    */

    this.interpreter = function(input, term) {
      var command, description, dockerCommand, inputs;
      inputs = input.split(" ");
      command = inputs[0];
      if (command === 'hi') {
        term.echo('hi there! What is your name??');
        term.push(function(command, term) {
          return term.echo(command + ' is a pretty name');
        });
      }
      if (command === 'shell') {
        term.push(function(command, term) {
          return term.echo(' is a pretty name');
        }, {
          prompt: '> $ '
        });
      }
      if (command === 'r') {
        location.reload('forceGet');
      }
      if (command === '#') {
        term.echo('which question?');
      }
      if (command === 'cd') {
        bash(term, inputs);
      }
      if (command === 'exec') {
        term.exec("docker run");
      }
      if (command === "help") {
        term.error('printing help');
        term.echo('[[b;#fff;]some text]');
      }
      if (command === "docker") {
        docker(term, inputs);
      }
      if (command === "colors") {
        for (dockerCommand in dockerCommands) {
          description = dockerCommands[dockerCommand];
          term.echo("[[b;#fff;]" + dockerCommand + "] - " + description + "");
        }
      }
      if (command === "pull") {
        term.echo('[[b;#fff;]some text]');
        wait(term, 5000, true);
        alert(term.get_output());
        return;
      }
      return immediateCallback(inputs);
    };
    /*
        Common utils
    */

    String.prototype.beginsWith = function(string) {
      return this.indexOf(string) === 0;
    };
    util_slow_lines = function(term, paragraph, keyword, finishedCallback) {
      var foo, i, lines;
      if (keyword) {
        lines = paragraph(keyword).split("\n");
      } else {
        lines = paragraph.split("\n");
      }
      term.pause();
      i = 0;
      foo = function(lines) {
        return self.setTimeout((function() {
          if (lines[i]) {
            term.echo(lines[i]);
            i++;
            return foo(lines);
          } else {
            term.resume();
            return finishedCallback();
          }
        }), 1000);
      };
      return foo(lines);
    };
    wait = function(term, time, dots) {
      var interval_id;
      term.echo("starting to wait");
      interval_id = self.setInterval((function() {
        return dots != null ? dots : term.insert('.');
      }), 500);
      return self.setTimeout((function() {
        var output;
        self.clearInterval(interval_id);
        output = term.get_command();
        term.echo(output);
        return term.echo("done ");
      }), time);
    };
    /*
        Bash program
    */

    bash = function(term, inputs) {
      var argument, echo, insert;
      echo = term.echo;
      insert = term.insert;
      if (!inputs[1]) {

      } else {
        argument = inputs[1];
        if (argument.beginsWith('..')) {
          return echo("-bash: cd: " + argument + ": Permission denied");
        } else {
          return echo("-bash: cd: " + argument + ": No such file or directory");
        }
      }
    };
    /*
        Docker program
    */

    docker = function(term, inputs) {
      var callback, commands, description, dockerCommand, echo, expected_switches, imagename, input, insert, j, keyword, parsed_input, result, switchArg, switchArgs, switches, _i, _len;
      echo = term.echo;
      insert = term.insert;
      callback = function() {
        return this.finishedCallback(inputs);
      };
      if (!inputs[1]) {
        console.debug("no args");
        echo(docker_cmd);
        for (dockerCommand in dockerCommands) {
          description = dockerCommands[dockerCommand];
          echo("[[b;#fff;]" + dockerCommand + "]" + description + "");
        }
      } else if (inputs[1] === 'do') {
        term.push('do', {
          prompt: "do $ "
        });
      } else if (inputs[1] === "run") {
        switches = [];
        switchArg = false;
        switchArgs = [];
        imagename = "";
        commands = [];
        j = 0;
        for (_i = 0, _len = inputs.length; _i < _len; _i++) {
          input = inputs[_i];
          if (input.startsWith('-')) {
            switches.push(input);
            if (run_switches[input].length > 0) {
              switchArg = true;
            }
          } else if (switchArg === true) {
            switchArg = false;
            switchArgs.push(input);
          } else if (j > 1 && imagename === "") {
            imagename = input;
          } else if (imagename !== "") {
            commands.push(input);
          } else {

          }
          j++;
        }
        parsed_input = {
          'switches': switches.sortBy(),
          'switchArgs': switchArgs,
          'imagename': imagename,
          'commands': commands
        };
        console.debug(JSON.stringify(parsed_input, void 0, 2));
        expected_switches = ['-i', '-t'];
        if (imagename === "ubuntu") {
          console.log("run ubuntu");
          echo(run_ubuntu);
        } else if (Object.equal(switches.sortBy(), expected_switches.sortBy())) {
          if (imagename === "learn/tutorial" && commands[0] === "/bin/bash") {
            immediateCallback(parsed_input, true);
            term.push(function(command, term) {
              return term.echo(' is a pretty shell');
            }, {
              prompt: '> $ '
            });
          } else {
            intermediateResults(1);
          }
        } else if (imagename === "learn/tutorial") {
          echo(run_learn_tutorial);
          intermediateResults(0);
        } else if (imagename) {
          echo(run_notfound(inputs[2]));
        } else {
          console.log("run");
          echo(run_cmd);
        }
      } else if (inputs[1] === "search") {
        if (keyword = inputs[2]) {
          if (keyword === "ubuntu") {
            echo(search_ubuntu);
          }
          if (keyword === "tutorial") {
            echo(search_tutorial);
          } else {
            echo(search_no_results(inputs[2]));
          }
        } else {
          echo(search);
        }
      } else if (inputs[1] === "pull") {
        if (keyword = inputs[2]) {
          if (keyword === 'ubuntu') {
            result = util_slow_lines(term, pull_ubuntu, "", callback);
          } else if (keyword === 'learn/tutorial') {
            result = util_slow_lines(term, pull_tutorial, "", callback);
          } else {
            util_slow_lines(term, pull_no_results, keyword);
          }
        } else {
          echo(pull);
        }
      } else if (inputs[1] === "version") {
        echo(version);
      } else if (dockerCommands[inputs[1]]) {
        echo("" + inputs[1] + " is a valid argument, but not implemented");
      }
    };
    /*
        Some default variables / commands
    
        All items are sorted by alphabet
    */

    docker_cmd = "Usage: docker [OPTIONS] COMMAND [arg...]\n-H=\"127.0.0.1:4243\": Host:port to bind/connect to\n\nA self-sufficient runtime for linux containers.\n\nCommands:\n";
    dockerCommands = {
      "attach": "    Attach to a running container",
      "build": "     Build a container from a Dockerfile",
      "commit": "    Create a new image from a container's changes",
      "diff": "      Inspect changes on a container's filesystem",
      "export": "    Stream the contents of a container as a tar archive",
      "history": "   Show the history of an image",
      "images": "    List images",
      "import": "    Create a new filesystem image from the contents of a tarball",
      "info": "      Display system-wide information",
      "insert": "    Insert a file in an image",
      "inspect": "   Return low-level information on a container",
      "kill": "      Kill a running container",
      "login": "     Register or Login to the docker registry server",
      "logs": "      Fetch the logs of a container",
      "port": "      Lookup the public-facing port which is NAT-ed to PRIVATE_PORT",
      "ps": "        List containers",
      "pull": "      Pull an image or a repository from the docker registry server",
      "push": "      Push an image or a repository to the docker registry server",
      "restart": "   Restart a running container",
      "rm": "        Remove a container",
      "rmi": "       Remove an image",
      "run": "       Run a command in a new container",
      "search": "    Search for an image in the docker index",
      "start": "     Start a stopped container",
      "stop": "      Stop a running container",
      "tag": "       Tag an image into a repository",
      "version": "   Show the docker version information",
      "wait": "      Block until a container stops, then print its exit code"
    };
    run_switches = {
      "-p": ['port'],
      "-t": [],
      "-i": [],
      "-h": ['hostname']
    };
    pull = "Usage: docker pull NAME\n\nPull an image or a repository from the registry\n\n-registry=\"\": Registry to download from. Necessary if image is pulled by ID\n-t=\"\": Download tagged image in repository";
    pull_no_results = function(keyword) {
      return "Pulling repository " + keyword + " from https://index.docker.io/v1\n2013/06/19 19:27:03 HTTP code: 404";
    };
    pull_ubuntu = "Pulling repository ubuntu from https://index.docker.io/v1\nPulling image 8dbd9e392a964056420e5d58ca5cc376ef18e2de93b5cc90e868a1bbc8318c1c (precise) from ubuntu\nPulling image b750fe79269d2ec9a3c593ef05b4332b1d1a02a62b4accb2c21d589ff2f5f2dc (12.10) from ubuntu\nPulling image 27cf784147099545 () from ubuntu";
    pull_tutorial = "Pulling repository learn/tutorial from https://index.docker.io/v1\nPulling image 8dbd9e392a964056420e5d58ca5cc376ef18e2de93b5cc90e868a1bbc8318c1c (precise) from ubuntu\nPulling image b750fe79269d2ec9a3c593ef05b4332b1d1a02a62b4accb2c21d589ff2f5f2dc (12.10) from ubuntu\nPulling image 27cf784147099545 () from tutorial";
    run_cmd = "Usage: docker run [OPTIONS] IMAGE COMMAND [ARG...]\n\nRun a command in a new container\n\n-a=map[]: Attach to stdin, stdout or stderr.\n-c=0: CPU shares (relative weight)\n-d=false: Detached mode: leave the container running in the background\n-dns=[]: Set custom dns servers\n-e=[]: Set environment variables\n-h=\"\": Container host name\n-i=false: Keep stdin open even if not attached\n-m=0: Memory limit (in bytes)\n-p=[]: Expose a container's port to the host (use 'docker port' to see the actual mapping)\n-t=false: Allocate a pseudo-tty\n-u=\"\": Username or UID\n-v=map[]: Attach a data volume\n-volumes-from=\"\": Mount volumes from the specified container\n";
    run_learn_tutorial = "2013/07/02 02:00:59 Error: No command specified";
    run_ubuntu = "2013/07/02 02:00:59 Error: No command specified";
    run_notfound = function(keyword) {
      return "Pulling repository " + keyword + " from https://index.docker.io/v1\n2013/07/02 02:14:47 Error: No such image: " + keyword;
    };
    search = "\nUsage: docker search NAME\n\nSearch the docker index for images\n";
    search_no_results = function(keyword) {
      return "Found 0 results matching your query (\"" + keyword + "\")\nNAME                DESCRIPTION";
    };
    search_tutorial = "Found 1 results matching your query (\"tutorial\")\nNAME                      DESCRIPTION\nlearn/tutorial            An image for the interactive tutorial";
    search_ubuntu = "Found 22 results matching your query (\"ubuntu\")\nNAME                DESCRIPTION\nshykes/ubuntu\nbase                Another general use Ubuntu base image. Tag...\nubuntu              General use Ubuntu base image. Tags availa...\nboxcar/raring       Ubuntu Raring 13.04 suitable for testing v...\ndhrp/ubuntu\ncreack/ubuntu       Tags:\n12.04-ssh,\n12.10-ssh,\n12.10-ssh-l...\ncrohr/ubuntu              Ubuntu base images. Only lucid (10.04) for...\nknewton/ubuntu\npallet/ubuntu2\nerikh/ubuntu\nsamalba/wget              Test container inherited from ubuntu with ...\ncreack/ubuntu-12-10-ssh\nknewton/ubuntu-12.04\ntithonium/rvm-ubuntu      The base 'ubuntu' image, with rvm installe...\ndekz/build                13.04 ubuntu with build\nooyala/test-ubuntu\nooyala/test-my-ubuntu\nooyala/test-ubuntu2\nooyala/test-ubuntu3\nooyala/test-ubuntu4\nooyala/test-ubuntu5\nsurma/go                  Simple augmentation of the standard Ubuntu...\n";
    return version = "Docker Emulator version 0.1\n\nEmulating:\nClient version: 0.4.7\nServer version: 0.4.7\nGo version: go1.1";
  })();

  return this;

}).call(this);