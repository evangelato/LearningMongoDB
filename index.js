const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minLength: 5,
        maxLength: 255,
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; }
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        // name: 'NodeJS Course',
        author: 'Evan',
        category: '-',
        tags: ['nodejs', 'frontend'],
        isPublished: true,
        // price: 15
    });

    try {
        const result = await course.save();
        console.log(result);
    } catch (err) {
        console.log(err.message);
    }
    
}

async function getCourses() {
    const courses = await Course
        //.find({ author: 'Evan', isPublished: true })
        .find({ author: /.*Evan.*/})
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1})
        .count();
    console.log(courses);
}

async function updateCourse(id) {
    const result = await Course.findByIdAndUpdate(id, {
      $set: {
          author: 'Hank',
          isPublished: false
      }  
    }, { new: true});
    console.log(result);
}

async function removeCourse(id) {
   const result = await Course.findByIdAndRemove(id);
   console.log(result);
}

createCourse();
//getCourses();
//updateCourse('5e12e4f57800f306adf8a774');
//removeCourse('5e12e4f57800f306adf8a774');