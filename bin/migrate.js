import Test from "../models/testTable.js";


async function main() {
    console.log(78)
    await Test.sync({alter:true})
   process.exit(0);
}
main()