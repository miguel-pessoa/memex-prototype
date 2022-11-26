FROM postgres:13.4
RUN apt-get update && apt-get install -y --no-install-recommends \
  postgresql-$PG_MAJOR-pgaudit \
  && localedef -i fi_FI -c -f UTF-8 -A /usr/share/locale/locale.alias fi_FI.UTF-8
ENV LANG fi_FI.UTF-8
ENV LANGUAGE fi_FI:fi
ENV LC_ALL fi_FI.UTF-8
