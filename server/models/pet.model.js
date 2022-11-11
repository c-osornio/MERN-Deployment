const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const SkillsSchema = new mongoose.Schema({
    skill: {
        type: String,
        enum:{
            values:[
                'Sit',
                'Potty Trained',
                'Roll-Over',
                'Fetch',
                'High Five',
                'Lay Down',
                'Kiss',
                'Wave',
                'Play Dead',
                'Dance',
                'Talk',
                'Come',
                'Stay',
                'Spin',
                'None'
            ],
            message:'*{VALUE} is not supported.'
        }
    }
})

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "*Pet name is required."],
        minLength: [2, "*Pet name must be at least 3 characters long."],
        trim: true,
        unique: true
    },
    type: {
        type: String,
        enum:{
            values:[
                'Dog',
                'Cat',
                'Bird',
                'Rabbit',
                'Guinea Pig',
                'Fish',
                'Reptile',
                'Ferret',
                'Insect',
                'Turtle',
                'Hamster',
                'Mouse',
                'Rat',
                'Arachnid'
            ],
            message:'*{VALUE} is not supported.'
        },
        required: [true, "*Pet type is required."],
        minLength: [2, "*Pet type must be at least 3 characters long."],
        trim: true
    },
    description: {
        type: String,
        required: [true, "*Pet description is required."],
        minLength: [3, "* Pet description must be at least 3 characters long."],
        trim: true
    },
    skills: {
        type: [SkillsSchema],
        validate:{
            validator:function(v){
                console.log(v.length)
                if(v.length > 3){
                    return false
                }
            },
            message:"*Pets may only have between 0 and 3 skills "
        }
    }, 
    image: {
        type: String,
    },
    like: {
        type: Boolean,
    }
}, 
{ timestamps: true }
)



const Pet = mongoose.model("Pet", PetSchema)

PetSchema.plugin(uniqueValidator, { message: '*Sorry, we already have a pet named, "{VALUE}". Pet names must be unique.' });

module.exports = Pet;