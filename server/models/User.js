import mongoose from "mongoose";

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    email: {
        type: String,
        validate: {
            validator: async function(email) {
              const user = await this.constructor.findOne({ email });
              if(user) {
                if(this.id === user.id) {
                  return true;
                }
                return false;
              }
              return true;
            },
            message: props => 'The specified email address is already in use.'
          },
        required: true
    },
    password: {
        type: String,
        required: true
    }
    },
    { timestamps: true });
    movieSchema.statics.findByLogin = async function (login) {
        let user = await this.findOne({
          username: login,
        });
       
        if (!user) {
          user = await this.findOne({ email: login });
        } 
        return user;
      };
    

const Movie = mongoose.model('movie',movieSchema);

export default Movie;
