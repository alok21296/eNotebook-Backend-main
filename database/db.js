import { connect } from'mongoose';
import 'dotenv/config';


const connectToMongo = async () => {
    try {
        // await connect(`mongodb+srv://bhavya54321:JvAUQJgCCYdLGK7i@merndb-0.snuwwf5.mongodb.net/eNotebook`);
        await connect(process.env.MONGO_URI);
        console.log('---***Database Connected Successfully***---');
    } catch (error) {
        console.log('---***Database Connection Failed***---');
        console.log(error);
    }
}

export default connectToMongo;
