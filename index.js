const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'NodeJS Course',
        author: 'Evan',
        tags: ['nodejs', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
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
    // Approach: Query first
    // findById()
    // Modify its properties
    // save()
    /*
    const course = await Course.findById(id);
    if (!course) {
        return;
    }
    course.set({
        isPublished: true,
        author: 'Jim'
    });
    const result = await course.save();
    console.log(result);
    */

    // Approach: Update first
    // Update directly
    // Optionally: get the updated document
    const result = await Course.findByIdAndUpdate(id, {
      $set: {
          author: 'Hank',
          isPublished: false
      }  
    }, { new: true});
    console.log(result);
}

//createCourse();
//getCourses();
updateCourse('5e12e4f57800f306adf8a774');