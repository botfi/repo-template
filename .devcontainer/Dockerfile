FROM ubuntu:24.04 AS base

ENV LANG=C.UTF-8 DEBIAN_FRONTEND=noninteractive
# Install asdf dependencies
RUN apt-get update -qq && apt-get install -y \
    git curl wget gawk gnupg dirmngr build-essential \
    libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev \
    llvm libncurses5-dev libncursesw5-dev \
    xz-utils tk-dev libffi-dev liblzma-dev \
    autoconf bison libyaml-dev libreadline6-dev libgdbm-dev \
    jq ripgrep \
    ffmpeg \
    vim \
    && rm -rf /var/lib/apt/lists/* \
    && curl -sS https://starship.rs/install.sh | sh -s -- --yes \
    && curl -sSL https://rover.apollo.dev/nix/v0.37.2 | sh

FROM base AS installer-1

ENV HOME=/root ASDF_DATA_DIR="/root/.asdf"
ENV PATH="${ASDF_DATA_DIR}/shims:/pnpm/bin:$HOME/.local/bin:${PATH}"
ENV ASDF_VERSION=0.18.1
ENV ASDF_TGZ_URL=https://github.com/asdf-vm/asdf/releases/download/v${ASDF_VERSION}/asdf-v${ASDF_VERSION}-linux-arm64.tar.gz
RUN \
    curl -fsSL ${ASDF_TGZ_URL} -o /tmp/asdf.tar.gz && \
    tar -C /usr/local/bin -xzf /tmp/asdf.tar.gz && \
    rm /tmp/asdf.tar.gz

FROM installer-1 AS installer-2

# Install plugins
RUN \
    # asdf plugin add ruby && \
    asdf plugin add nodejs && \
    # asdf plugin add uv && \
    # asdf plugin add python && \
    echo "Plugins Installed"

# Install languages
RUN \
    # asdf install ruby 3.3.8 && \
    asdf install nodejs 24.14.0 && \
    # asdf install uv 0.8.10 && \
    # asdf install python 3.12.11 && \
    echo "Languages Installed"

RUN \
    # asdf set --home ruby 3.3.8 && \
    asdf set --home nodejs 24.14.0 && \
    # asdf set --home uv 0.8.10 && \
    # asdf set --home python 3.12.11 && \
    echo "Languages Set"

FROM installer-2 AS installer-3

# Install pnpm
RUN \
    asdf plugin add pnpm https://github.com/jonathanmorley/asdf-pnpm.git && \
    asdf install pnpm 10.32.1 && \
    asdf set --home pnpm 10.32.1

FROM installer-3 AS runner

RUN \
  echo "PS1='🐳  \[\033[1;36m\][\$(hostname)] \[\033[1;34m\]\W\[\033[0;35m\] \[\033[1;36m\]\[\033[0m\]'" >> ~/.bashrc; \
  echo "alias ls='ls --color=auto'" >> ~/.bashrc; \
  echo "alias grep='grep --color=auto'" >> ~/.bashrc; \
  echo 'eval "$(starship init bash)"' >> ~/.bashrc

WORKDIR /workspace
ENV EDITOR=vim
ENV STARSHIP_CONFIG=/workspace/.devcontainer/starship.toml

CMD ["/bin/sh"]
