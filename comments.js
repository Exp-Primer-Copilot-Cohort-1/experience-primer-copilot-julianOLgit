//create web server
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to mongoose
mongoose.connect('mongodb://localhost/comments');
var db = mongoose.connection;

//check connection
db.once('open', function(){
  console.log('connected to mongodb');
});

//check for db errors
db.on('error', function(err){
  console.log(err);
});

//bring in models
var Comment = require('./models/comment');

//load view engine
app.set('view engine', 'ejs');

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//set public folder
app.use(express.static(__dirname + '/public'));

//home route
app.get('/', function(req, res){
  Comment.find({}, function(err, comments){
    if(err){
      console.log(err);
    } else {
      res.render('index', {
        title: 'Comments',
        comments: comments
      });
    }
  });
});

app.post('/comments/add', function(req, res){
  var comment = new Comment();
  comment.name = req.body.name;
  comment.comment = req.body.comment;

  comment.save(function(err){
    if(err){
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

app.listen(3000, function(){
  console.log('Server started on port 3000');
});