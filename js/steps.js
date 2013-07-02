// Generated by CoffeeScript 1.3.3

/*
  This is the main script file. It can attach to the terminal
*/


/*
  Register the things
*/


(function() {
  var buildfunction, current_question, currentquestion, f, leaveFullSizeMode, next, previous, q, question, questions, results, _i, _len;

  this.webterm = $('#terminal').terminal(interpreter, basesettings);

  $('#buttonNext').click(function() {
    next();
    return $('#results').hide();
  });

  $('#buttonPrevious').click(function() {
    previous();
    return $('#results').hide();
  });

  /*
    Start with the questions
  */


  questions = [];

  current_question = 0;

  next = function() {
    current_question++;
    questions[current_question]();
    results.clear();
  };

  previous = function() {
    current_question--;
    questions[current_question]();
    results.clear();
  };

  results = {
    set: function(htmlText, intermediate) {
      if (intermediate) {
        console.debug("intermedaiate text received");
        $('#results').addClass('intermediate');
      }
      $('#resulttext').html(htmlText);
      $('#results').show();
      return $('#buttonNext').removeAttr('disabled');
    },
    clear: function() {
      $('#resulttext').html("");
      return $('#results').hide();
    }
  };

  /*
    Array of question objects
  */


  q = [];

  q.push({
    html: "<h1>Check if Docker is running</h1>\n<p>First of all, we want to check if docker is installed correctly and running</p>\n<p><em>docker version</em> will show the versions docker is running. If you get the version numbers, you know\nyou are all set.</p>\n<h4>background:</h4>\n<p>There are actually two programs, a Docker daemon, it manages al the containers, and the Docker client.\nThe client acts as a remote control on the daemon. On most systems, like in this emulation, both run on the\nsame host.</p>",
    command_expected: ['docker', 'version'],
    result: "<p>Well done! Let's move to the next assignment.</p>",
    tip: "try typing `docker version"
  });

  q.push({
    html: "<h1>Search for images</h1>\n<p>The easiest way of getting started is to use a container image from someone else. Container images are\navailable on the docker index and can be found by using <em>docker search</em></p>\n<p>Please search for an image called tutorial</p>",
    command_expected: ['docker', 'search', 'tutorial'],
    result: "<p>You found it!</p>",
    tip: ""
  });

  q.push({
    html: "<h1>Download images</h1>\n<p>Container images can be downloaded just as easily, using <em>docker pull</em></p>\n<p>Please download the tutorial image</p>",
    command_expected: ['docker', 'pull', 'learn/tutorial'],
    result: "<p>Cool. Look at the results. You'll see that docker has downloaded a number of different layers</p>",
    tip: "don't forget to pull the full name of the repository e.g. 'learn/tutorial'"
  });

  q.push({
    html: "<h1>Interactive Shell</h1>\n<p>Now, since Docker provides you with the equivalent of a complete operating system you are able to get\nan interactive shell (tty) <em>inside of the container</em>. Your goal is to run the tutorial container you have\njust downloaded and get a shell inside of it.</p>\n<p>The command to run a container is <em>docker run</em>",
    command_expected: ["docker", "run", "-i", "-t", "learn/tutorial", "/bin/bash"],
    result: "<p>Great!! Now you have an interactive terminal</p>",
    intermediateresults: ["<p>You seem to be almost there. Did you use <em>-i and -t</em>?</p>", "<p>You've got the arguments right. Did you get the command? Try <em>/bin/bash </em>?</p>"],
    tip: "don't forget to pull the full name of the repository e.g. 'learn/tutorial'"
  });

  /*
    Transform question objects into functions
  */


  buildfunction = function(q) {
    var _q;
    _q = q;
    return function() {
      console.debug("function called");
      $('#instructions .text').html(_q.html);
      window.immediateCallback = function(input, stop) {
        var doNotExecute;
        if (stop === true) {
          doNotExecute = true;
        } else {
          doNotExecute = false;
        }
        if (doNotExecute !== true) {
          console.log("callback");
          console.log(input);
          if (Object.equal(input, _q.command_expected)) {
            results.set(_q.result);
          } else {

          }
        } else {

        }
      };
      window.intermediateResults = function(input) {
        var intermediate;
        return results.set(_q.intermediateresults[input], intermediate = true);
      };
    };
  };

  for (_i = 0, _len = q.length; _i < _len; _i++) {
    question = q[_i];
    f = buildfunction(question);
    questions.push(f);
  }

  /*
    Initialization of program
  */


  if (window.location.hash) {
    try {
      currentquestion = window.location.hash.split('#')[1].toNumber();
      questions[currentquestion]();
    } catch (err) {
      questions[0]();
    }
  } else {
    questions[0]();
  }

  $('#results').hide();

  /*
    Make the resizing possible
  */


  $('#fullSizeOpen').click(function() {
    console.debug("going to fullsize mode");
    $('#overlay').addClass('fullsize');
    $('#main').addClass('fullsize');
    $('#tutorialTop').addClass('fullsize');
    return webterm.resize();
  });

  $('#fullSizeClose').click(function() {
    return leaveFullSizeMode();
  });

  leaveFullSizeMode = function() {
    console.debug("leaving full-size mode");
    $('#overlay').removeClass('fullsize');
    $('#main').removeClass('fullsize');
    $('#tutorialTop').removeClass('fullsize');
    return webterm.resize();
  };

}).call(this);