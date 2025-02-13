const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { userResolvers } = require('./userSchema');
const { employeeResolvers } = require('./employeeSchema');

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        employees: employeeResolvers.employees, // Get all employees
        employee: employeeResolvers.employee    // Get employee by ID
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        register: userResolvers.register,
        login: userResolvers.login,
        addEmployee: employeeResolvers.addEmployee,
        updateEmployee: employeeResolvers.updateEmployee,
        deleteEmployee: employeeResolvers.deleteEmployee  // 🔥 Ensure this is included!
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
