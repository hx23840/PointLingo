# PointLingo: 智能鼠标指向翻译插件

PointLingo 是一款创新的 Chrome 翻译插件，允许用户通过简单地将鼠标指向文本来获得即时翻译。它利用本地 Ollama 服务和高效的 Qwen 2.0 模型来提供快速、准确的翻译。

## 特性

- 鼠标指向即时翻译
- 支持中文、英文和日语
- 自动选中文本高亮显示
- 利用本地 Ollama 服务，保护隐私
- 可自定义 AI 模型选择

## 安装步骤

1. 安装 Chrome 插件（从提供的 .crx 文件）
2. 设置 Ollama 服务

### 安装 Ollama

请访问 [Ollama 官方网站](https://ollama.ai/) 并按照指示安装 Ollama。

### 配置 Ollama

#### Linux 用户（包括 WSL）

1. 编辑 Ollama 服务文件：
   ```
   sudo vim /etc/systemd/system/ollama.service
   ```

2. 添加以下环境变量：
   ```
   Environment="OLLAMA_HOST=0.0.0.0"
   Environment="OLLAMA_ORIGINS=*"
   ```
   注意：纯 Linux 环境可以忽略 `OLLAMA_HOST` 设置。

3. 重启 Ollama 服务：
   ```
   sudo systemctl daemon-reload
   sudo systemctl restart ollama
   ```

#### Mac 用户

对于 Mac 用户，我们推荐使用 LaunchAgent 来设置环境变量。这种方法可以确保环境变量在系统启动时就被正确设置，并对所有 GUI 应用程序可用。

按照以下步骤设置 `OLLAMA_ORIGINS` 环境变量：

1. 创建 LaunchAgent 配置文件：
   a. 打开终端。
   b. 运行以下命令创建必要的目录（如果还不存在）：
      ```
      mkdir -p ~/Library/LaunchAgents
      ```
   c. 使用文本编辑器创建一个名为 `environment.plist` 的文件在 `~/Library/LaunchAgents/` 目录下。例如，使用 nano：
      ```
      nano ~/Library/LaunchAgents/environment.plist
      ```
   d. 将以下内容复制到文件中：
      ```xml
   <?xml version="1.0" encoding="UTF-8"?>
      <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
      <plist version="1.0">
      <dict>
        <key>Label</key>
        <string>setenv.OLLAMA_ORIGINS</string>
        <key>ProgramArguments</key>
        <array>
          <string>/bin/launchctl</string>
          <string>setenv</string>
          <string>OLLAMA_ORIGINS</string>
          <string>*</string>
        </array>
        <key>RunAtLoad</key>
        <true/>
      </dict>
   </plist>
      ```
   e. 保存文件并退出编辑器。如果使用 nano，按 `Ctrl+X`，然后 `Y`，最后 `Enter` 来保存并退出。

2. 加载 LaunchAgent：
   在终端中运行以下命令来加载新创建的 LaunchAgent：
   ```
   launchctl load ~/Library/LaunchAgents/environment.plist
   ```

3. 验证设置：
   可以通过以下命令来验证环境变量是否正确设置：
   ```
   launchctl getenv OLLAMA_ORIGINS
   ```
   如果正确设置，应该显示 `*`。
4. 重启 Ollama 服务

注意：这种方法比单独使用 `launchctl setenv` 命令更可靠，因为它确保了环境变量在每次系统启动时都被正确设置，并且对所有应用程序可用。

## 使用方法

1. 将鼠标悬停在需要翻译的文本上约 1 秒钟
2. 插件将自动翻译并高亮显示选中的文本
3. 查看翻译结果

## 自定义设置

1. 在插件设置中，您可以选择喜欢的 AI 模型
2. 默认使用 qwen2:0.5b 模型，该模型在速度和效果上取得了良好的平衡

## 贡献

我们欢迎任何形式的贡献，包括但不限于：
- 错误修复
- 新功能提交
- 改进建议
- 文档增强

## 许可证

本项目采用 [GNU General Public License v3.0](./LICENSE) 许可证。

## 联系我们

如果您有任何问题或建议，请通过 [issues](https://github.com/hx23840/PointLingo/issues) 提交，或者[发送邮件](mailto:peter@lyrai.app)至我们的开发团队

感谢您的关注和支持！让我们一起构建一个更智能、更开放的未来。
