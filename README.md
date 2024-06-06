# Node SDK
This SDK provides functions for sending events, creating users, and updating user information via HTTPS requests for [DataLoaf](https://data-loaf.com)

## Installation
To use the SDK in your project, you can install it via npm:

```bash
npm install @data-loaf/node-sdk
```

## Usage

### Initialization

To start using the SDK, you need to initialize it with the gateway URL and optional developer configuration.

<details>
<summary>Initialization</summary>

**`init(gatewayUrl: string, developerConfig?: object): loaf`**

- `gatewayUrl` (string): The URL of the gateway.
- `developerConfig` (object): Optional configuration object for developer settings like testing and debugging.

**Example:**

```javascript
import sdk from "@data-loaf/node-sdk"

const gatewayUrl = "https://aws.bvha2j3juseast1.com";
const developerConfig = {
  test: true,
  debug: false,
};

const loaf = sdk.init(gatewayUrl, developerConfig);
```
</details>

#### Default Configuration
The SDK comes with default configuration options, but you can override them during initialization if needed.

<details>
<summary>config options</summary>

**Example:**
```javascript
const config = {
    debug: false,
    test: false,
}
```
</details>

### Sending Events

You can send events using the `sendEvent` function.

<details>
<summary>sendEvent</summary>

**`sendEvent(eventName: string, [userId]: string, [eventAttributes]: object): object`**

- `eventName` (string): The name of the event.
- `userId` (string): The ID of the user associated with the event.
- `eventAttributes` (object): Additional attributes associated with the event.

**Example:**

```javascript
loaf.sendEvent("login", "user123", { platform: "web" });
```
</details>

### Creating Users

To create a new user, use the `makeUser` function.

<details>
<summary>makeUser</summary>

**`makeUser(userId: string, [userAttributes]: object): object`**

- `userId` (string): The ID of the new user.
- `userAttributes` (object): Attributes of the new user.

**Example:**

```javascript
loaf.makeUser("user456", { name: "John Doe", email: "john@example.com" });
```
</details>

### Updating Users

You can update user information using the `updateUser` function.

<details>
<summary>updateUser</summary>

**`updateUser(userId: string, userAttributes: object): object`**

- `userId` (string): The ID of the user to update.
- `userAttributes` (object): Updated attributes of the user.

**Example:**

```javascript
loaf.updateUser("user456", { email: "john.doe@example.com" });
```
</details>
