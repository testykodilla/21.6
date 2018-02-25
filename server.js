const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/nodeappdatabase', {
    useMongoClient: true
});


const userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    created_at: Date,
    updated_at: Date
});


userSchema.methods.manify = function(next) {
    this.name = this.name + '-boy';

    return next(null, this.name);
};


userSchema.pre('save', function(next) {

    const currentDate = new Date();

    this.updated_at = currentDate;

    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

const User = mongoose.model('User', userSchema);

const kenny = new User({
    name: 'Kenny',
    username: 'Kenny_the_boy',
    password: 'password'
});

kenny.manify(function(err, name) {
    if (err) throw err;
    console.log('Twoje nowe imię to: ' + name);
});

kenny.save(function(err) {
    if (err) throw err;

    console.log('Uzytkownik zapisany pomyslnie');
});

const benny = new User({
    name: 'Benny',
    username: 'Benny_the_boy',
    password: 'password'
});

benny.manify(function(err, name) {
    if (err) throw err;
    console.log('Twoje nowe imię to: ' + name);
});

benny.save(function(err) {
    if (err) throw err;

    console.log('Uzytkownik ' + benny.name +  ' zapisany pomyslnie');
});

const mark = new User({
    name: 'Mark',
    username: 'Mark_the_boy',
    password: 'password'
});

mark.manify(function(err, name) {
    if (err) throw err;
    console.log('Twoje nowe imię to: ' + name);
});

mark.save(function(err) {
    if (err) throw err;

    console.log('Uzytkownik ' + mark.name +  ' zapisany pomyslnie');
});

const query = User.find({});
const promise = query.exec();
promise.then(function(records) {
    console.log('Actual database records are ' + records);
});
promise.catch(function(reason) {
    console.log('Something went wrong: ', reason);
});

User.find({ username: 'Kenny_the_boy' }).exec(function(err, res) {
    if (err) throw err;
    console.log('Record you are looking for is ' + res);
});

User.find({ username: 'Kenny_the_boy' }, function(err, user) {
    if (err) throw err;
    console.log('Old password is ' + user[0].password);
    user[0].password = 'newPassword';
    console.log('New password is ' + user[0].password);


    user[0].save(function(err) {
        if (err) throw err;

        console.log('Uzytkownik ' + user[0].name + ' zostal pomyslnie zaktualizowany');
    })
});

User.find({ username: 'Mark_the_boy' }, function(err, user) {
    if (err) throw err;
    user = user[0];
    user.remove(function(err) {
        if (err) throw err;

        console.log('User successfully deleted');
    });
});

User.findOneAndRemove({ username: 'Benny_the_man' }, function(err) {
    if (err) throw err;

    console.log('User deleted!');
});