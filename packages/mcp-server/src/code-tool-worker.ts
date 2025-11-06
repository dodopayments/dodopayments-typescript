// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import util from 'node:util';

import Fuse from 'fuse.js';
import ts from 'typescript';

import { WorkerInput, WorkerSuccess, WorkerError } from './code-tool-types';
import { DodoPayments } from 'dodopayments';

function getRunFunctionNode(
  code: string,
): ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction | null {
  const sourceFile = ts.createSourceFile('code.ts', code, ts.ScriptTarget.Latest, true);

  for (const statement of sourceFile.statements) {
    // Check for top-level function declarations
    if (ts.isFunctionDeclaration(statement)) {
      if (statement.name?.text === 'run') {
        return statement;
      }
    }

    // Check for variable declarations: const run = () => {} or const run = function() {}
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name) && declaration.name.text === 'run') {
          // Check if it's initialized with a function
          if (
            declaration.initializer &&
            (ts.isFunctionExpression(declaration.initializer) || ts.isArrowFunction(declaration.initializer))
          ) {
            return declaration.initializer;
          }
        }
      }
    }
  }

  return null;
}

const fuse = new Fuse(
  [
    'client.checkoutSessions.create',
    'client.checkoutSessions.retrieve',
    'client.payments.create',
    'client.payments.list',
    'client.payments.retrieve',
    'client.payments.retrieveLineItems',
    'client.subscriptions.changePlan',
    'client.subscriptions.charge',
    'client.subscriptions.create',
    'client.subscriptions.list',
    'client.subscriptions.retrieve',
    'client.subscriptions.retrieveUsageHistory',
    'client.subscriptions.update',
    'client.invoices.payments.retrieve',
    'client.invoices.payments.retrieveRefund',
    'client.licenses.activate',
    'client.licenses.deactivate',
    'client.licenses.validate',
    'client.licenseKeys.list',
    'client.licenseKeys.retrieve',
    'client.licenseKeys.update',
    'client.licenseKeyInstances.list',
    'client.licenseKeyInstances.retrieve',
    'client.licenseKeyInstances.update',
    'client.customers.create',
    'client.customers.list',
    'client.customers.retrieve',
    'client.customers.update',
    'client.customers.customerPortal.create',
    'client.customers.wallets.list',
    'client.customers.wallets.ledgerEntries.create',
    'client.customers.wallets.ledgerEntries.list',
    'client.refunds.create',
    'client.refunds.list',
    'client.refunds.retrieve',
    'client.disputes.list',
    'client.disputes.retrieve',
    'client.payouts.list',
    'client.products.archive',
    'client.products.create',
    'client.products.list',
    'client.products.retrieve',
    'client.products.unarchive',
    'client.products.update',
    'client.products.updateFiles',
    'client.products.images.update',
    'client.misc.listSupportedCountries',
    'client.discounts.create',
    'client.discounts.delete',
    'client.discounts.list',
    'client.discounts.retrieve',
    'client.discounts.update',
    'client.addons.create',
    'client.addons.list',
    'client.addons.retrieve',
    'client.addons.update',
    'client.addons.updateImages',
    'client.brands.create',
    'client.brands.list',
    'client.brands.retrieve',
    'client.brands.update',
    'client.brands.updateImages',
    'client.webhooks.create',
    'client.webhooks.delete',
    'client.webhooks.list',
    'client.webhooks.retrieve',
    'client.webhooks.retrieveSecret',
    'client.webhooks.unsafeUnwrap',
    'client.webhooks.unwrap',
    'client.webhooks.update',
    'client.webhooks.headers.retrieve',
    'client.webhooks.headers.update',
    'client.usageEvents.ingest',
    'client.usageEvents.list',
    'client.usageEvents.retrieve',
    'client.meters.archive',
    'client.meters.create',
    'client.meters.list',
    'client.meters.retrieve',
    'client.meters.unarchive',
  ],
  { threshold: 1, shouldSort: true },
);

function getMethodSuggestions(fullyQualifiedMethodName: string): string[] {
  return fuse
    .search(fullyQualifiedMethodName)
    .map(({ item }) => item)
    .slice(0, 5);
}

const proxyToObj = new WeakMap<any, any>();
const objToProxy = new WeakMap<any, any>();

type ClientProxyConfig = {
  path: string[];
  isBelievedBad?: boolean;
};

function makeSdkProxy<T extends object>(obj: T, { path, isBelievedBad = false }: ClientProxyConfig): T {
  let proxy: T = objToProxy.get(obj);

  if (!proxy) {
    proxy = new Proxy(obj, {
      get(target, prop, receiver) {
        const propPath = [...path, String(prop)];
        const value = Reflect.get(target, prop, receiver);

        if (isBelievedBad || (!(prop in target) && value === undefined)) {
          // If we're accessing a path that doesn't exist, it will probably eventually error.
          // Let's proxy it and mark it bad so that we can control the error message.
          // We proxy an empty class so that an invocation or construction attempt is possible.
          return makeSdkProxy(class {}, { path: propPath, isBelievedBad: true });
        }

        if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
          return makeSdkProxy(value, { path: propPath, isBelievedBad });
        }

        return value;
      },

      apply(target, thisArg, args) {
        if (isBelievedBad || typeof target !== 'function') {
          const fullyQualifiedMethodName = path.join('.');
          const suggestions = getMethodSuggestions(fullyQualifiedMethodName);
          throw new Error(
            `${fullyQualifiedMethodName} is not a function. Did you mean: ${suggestions.join(', ')}`,
          );
        }

        return Reflect.apply(target, proxyToObj.get(thisArg) ?? thisArg, args);
      },

      construct(target, args, newTarget) {
        if (isBelievedBad || typeof target !== 'function') {
          const fullyQualifiedMethodName = path.join('.');
          const suggestions = getMethodSuggestions(fullyQualifiedMethodName);
          throw new Error(
            `${fullyQualifiedMethodName} is not a constructor. Did you mean: ${suggestions.join(', ')}`,
          );
        }

        return Reflect.construct(target, args, newTarget);
      },
    });

    objToProxy.set(obj, proxy);
    proxyToObj.set(proxy, obj);
  }

  return proxy;
}

const fetch = async (req: Request): Promise<Response> => {
  const { opts, code } = (await req.json()) as WorkerInput;
  if (code == null) {
    return Response.json(
      {
        message:
          'The code param is missing. Provide one containing a top-level `run` function. Write code within this template:\n\n```\nasync function run(client) {\n  // Fill this out\n}\n```',
      } satisfies WorkerError,
      { status: 400, statusText: 'Code execution error' },
    );
  }

  const runFunctionNode = getRunFunctionNode(code);
  if (!runFunctionNode) {
    return Response.json(
      {
        message:
          'The code is missing a top-level `run` function. Write code within this template:\n\n```\nasync function run(client) {\n  // Fill this out\n}\n```',
      } satisfies WorkerError,
      { status: 400, statusText: 'Code execution error' },
    );
  }

  const client = new DodoPayments({
    ...opts,
  });

  const logLines: string[] = [];
  const errLines: string[] = [];
  const console = {
    log: (...args: unknown[]) => {
      logLines.push(util.format(...args));
    },
    error: (...args: unknown[]) => {
      errLines.push(util.format(...args));
    },
  };
  try {
    let run_ = async (client: any) => {};
    eval(`
      ${code}
      run_ = run;
    `);
    const result = await run_(makeSdkProxy(client, { path: ['client'] }));
    return Response.json({
      result,
      logLines,
      errLines,
    } satisfies WorkerSuccess);
  } catch (e) {
    const message = e instanceof Error ? e.message : undefined;
    return Response.json(
      {
        message,
      } satisfies WorkerError,
      { status: 400, statusText: 'Code execution error' },
    );
  }
};

export default { fetch };
