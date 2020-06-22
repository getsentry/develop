#!/usr/bin/env python
import argparse
import re
import os
import sys
import logging
import yaml

from datetime import datetime

_yaml_header_re = re.compile(r"^(?:\n*---\n([\s\n\S]+\n)?---\n+)?(.*)$", re.DOTALL)


def handle_file(filepath, output_path):
    filename = filepath.rsplit(os.sep, 1)[-1]
    output_filename = os.path.join(output_path, filename)
    if filename.endswith(".md"):
        output_filename += "x"

    logging.info("Converting %s", filepath)
    with open(filepath, "r") as f:
        logging.debug("Parsing front matter")
        content = f.read()
        match = _yaml_header_re.match(content)
        header = match.group(1)
        text = match.group(2)
        if header:
            header = yaml.load(header)
        else:
            header = {}
        with open(output_filename, "w") as nf:
            if header:
                nf.write("---" + os.linesep)
                for key, value in header.items():
                    if value is not None:
                        nf.write(yaml.dump({key: value}, default_flow_style=False))
                nf.write("---" + os.linesep)

            # syntax highlighting
            text = re.sub(
                r"\s*{% highlight ([^\s]+) %}\n?(.*)\n?\s*{% endhighlight %}",
                "```$1\n$2\n```",
                text,
                flags=re.MULTILINE | re.IGNORECASE,
            )
            nf.write(text)


if __name__ == "__main__":
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    logging.basicConfig(format="%(message)s")

    parser = argparse.ArgumentParser(description="Options")
    parser.add_argument(
        "-o",
        "--output",
        type=str,
        help="Path to output folder, will be created if it does not exist. Defaults to content",
        default="src/docs-main",
    )
    parser.add_argument(
        "-v",
        "--verbose",
        action="store_true",
        help="Print extra logging output",
        default=False,
    )
    parser.add_argument(
        "source", type=str, help="Path to folder containing jekyll posts"
    )
    args = parser.parse_args()

    verbose = args.verbose

    if not os.path.exists(args.source):
        logging.error(
            "Source folder not found, make sure that the folder %s exists", args.source
        )
        sys.exit(-1)

    if not os.path.exists(args.output):
        logging.info("Creating folder %s for output", args.output)
        os.makedirs(args.output)

    source = os.path.normpath(args.source)
    output = os.path.normpath(args.output)
    for root, dirs, files in os.walk(source):
        for name in files:
            handle_file(os.path.normpath(os.path.join(root, name)), output)
