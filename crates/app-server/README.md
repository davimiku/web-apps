
## Automatic Reloading

Run both of the following commands in separate terminal windows to startup the auto-reload.

The first command watches all files except for the

```sh
# Adapted from https://vinnymeller.com/posts/rust-webserver-hot-reload/
cargo watch -i "src/app-server/.reload-trigger" -s "cargo build --bin app-server" -s "touch src/app-server/.reload-trigger"
systemfd --no-pid -s http::3000 -- cargo watch --no-vcs-ignores -w "src/app-server/.reload-trigger" -s "cargo run --bin app-server"
```
