import { createServer, Model, Factory, Response } from 'miragejs';

interface User {
  id: string;
  key: string;
  name: string;
  age: number;
  address: string;
  interest?: string;
  sex?: string;
}

export function makeServer() {
  return createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },
    factories: {
      user: Factory.extend({
        key(i: number) {
          return `${i + 1}`;
        },
        id(i: number) {
          return `${i + 1}`;
        },
        name(i: number) {
          return `John Doe${i + 1}`;
        },
        age: 30,
        address: '123 Main St',
        interest: '打球',
        sex: '男',
      }),
    },

    seeds(server) {
      server.createList('user', 80);
    },

    routes() {
      this.namespace = 'api';
      // 获取所有用户或根据名称过滤用户并进行分页
      this.get('/users', (schema, request) => {
        const name = request.queryParams.name_like as string;
        const page = parseInt(request.queryParams.page as string, 10) || 1;
        const pageSize =
          parseInt(request.queryParams.limit as string, 10) || 10;

        let users = schema.all('user').models;

        if (name) {
          users = users.filter((user: User) => {
            return user.name.toLowerCase().includes(name.toLowerCase());
          });
        }

        const totalPages = Math.ceil(users.length / pageSize);
        const paginatedUsers = users.slice(
          (page - 1) * pageSize,
          page * pageSize,
        );

        return paginatedUsers.length > 0
          ? { users: paginatedUsers, totalPages, total: users.length }
          : new Response(404, {}, { error: 'User not found' });
      });

      this.get('/not-found', () => {
        return new Response(404, {}, { error: '找不到資源' });
      });

      // 创建新用户
      this.post('/users', (schema, request) => {
        const attrs = JSON.parse(request.requestBody) as User;

        // 生成 id 和 key
        const id = generateUniqueId(); // 你需要实现这个函数来生成唯一的 id
        const key = generateUniqueKey(); // 你需要实现这个函数来生成唯一的 key

        // 将 id 和 key 添加到 attrs 对象中
        const newUserAttrs = { ...attrs, id, key };

        const newUser = schema.create('user', newUserAttrs);
        return newUser;
      });

      // 获取特定用户
      this.get('/users/:id', (schema, request) => {
        const id = request.params.id;
        const user = schema.find('user', id);
        console.log(`User with id ${id}:`, JSON.stringify(user, null, 2));

        // 如果找到用户则返回，否则返回 404 错误
        return user ? user : new Response(404, {}, { error: 'User not found' });
      });

      // 更新特定用户
      this.put('/users/:id', (schema, request) => {
        const id = request.params.id;
        const newAttrs = JSON.parse(request.requestBody) as User;
        const user = schema.find('user', id);

        // 如果找到用户则更新并返回成功消息，否则返回 404 错误
        if (user) {
          user.update(newAttrs);
          console.log(
            `User with id ${id} updated:`,
            JSON.stringify(user, null, 2),
          ); // 打印更新后的用户
          return new Response(
            200,
            {},
            { message: 'User updated successfully' },
          );
        } else {
          return new Response(404, {}, { error: 'User not found' });
        }
      });

      // 删除特定用户
      this.delete('/users/:id', (schema, request) => {
        const id = request.params.id; // 获取用户 ID
        const user = schema.find('user', id); // 查找用户

        // 如果找到用户则删除并返回成功消息，否则返回 404 错误
        if (user) {
          user.destroy();
          console.log(`User with id ${id} deleted`); // 打印删除的用户 ID
          return new Response(
            200,
            {},
            { message: 'User deleted successfully' },
          );
        } else {
          return new Response(404, {}, { error: 'User not found' });
        }
      });
      this.passthrough((request) => {
        if (request.url.includes('/api/')) {
          return new Response(404, {}, { error: 'Resource not found' });
        }
      });
    },
  });
}

// 示例生成唯一 id 和 key 的函数
function generateUniqueId(): string {
  return 'id-' + Math.random().toString(36).substr(2, 9);
}

function generateUniqueKey(): string {
  return 'key-' + Math.random().toString(36).substr(2, 9);
}
