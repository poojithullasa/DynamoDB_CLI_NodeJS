1. Create a table in dynamodb for any standard record object - Employees, Books, User, any other

2. Implement a nodejs based REST interface which provides POST, GET, PATCH, and DELETE operations on this table.
   Handle standard cases like already exists, not found, etc. For search support 'starts with' and 'equals' on the name column.
   Also support 'contains' if possible.

3. Now implement a CLI which allows all operations possible through the REST API. Internally CLI should call the REST API.

   - Display returned objects or messages, as is, i.e. in JSON format and also in tabular format
