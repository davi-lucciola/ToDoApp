FROM python:3.10-alpine

ENV PYTHONUNBUFFERED=1
ENV APP_PATH=/to-do

WORKDIR ${APP_PATH}

COPY pyproject.toml poetry.lock ${APP_PATH}

RUN pip3 install --upgrade pip && \
    pip3 install --no-cache-dir poetry && \
    poetry config virtualenvs.create false && \
    poetry install

COPY . ${APP_PATH}

EXPOSE 5000

CMD ["gunicorn", "-b", "0.0.0.0:5000", "app.main:app"]