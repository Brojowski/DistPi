var i = 2;
var results = [];

function getNextTask()
{
    console.log('getNextTask');

    return {number: i++};
}

function completedTask(result)
{
    console.log('completedTask');

    if (result.isPrime)
    {
        results.push(result.number);
    }
}

function task(data)
{
    console.log('task');

    for (var div = 2; div <= (data.number/2); div++)
    {
        // If result is an integer, it is not prime.
        if (Number.isInteger(data.number / div))
        {
            return {
                number: data.number,
                isPrime: false,
                divisor: div
            };
        }
    }

    return {
        number: data.number,
        isPrime: true
    }; 
}

module.exports = function ()
{
    return {
        getNewTask: getNextTask,
        taskCompleted: completedTask,
        doTask:task,
        getResult: function ()
        {
            return results;
        }
    }
}