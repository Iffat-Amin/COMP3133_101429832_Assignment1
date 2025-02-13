const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql');
const Employee = require('../models/Employee');

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        position: { type: GraphQLString },
        department: { type: GraphQLString },
        salary: { type: GraphQLInt }
    })
});

const employeeResolvers = {
    employees: {
        type: new GraphQLList(EmployeeType),
        async resolve() {
            return await Employee.find();
        }
    },
    addEmployee: {
        type: EmployeeType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            position: { type: new GraphQLNonNull(GraphQLString) },
            department: { type: new GraphQLNonNull(GraphQLString) },
            salary: { type: new GraphQLNonNull(GraphQLInt) }
        },
        async resolve(_, args) {
            return await new Employee(args).save();
        }
    }
};

module.exports = { EmployeeType, employeeResolvers };
